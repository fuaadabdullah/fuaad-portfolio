import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { stagePush, flushBranchQueue, branchKey, shouldProcessBranchTick } from "../src/branch_queue.js";

class FakeKV {
  constructor() { this.data = new Map(); }
  async get(k) { return this.data.get(k) ?? null; }
  async put(k, v) { this.data.set(k, v); }
  async delete(k) { this.data.delete(k); }
  async list({ prefix, limit }) {
    return { keys: [...this.data.keys()].filter(k => k.startsWith(prefix)).sort()
      .slice(0, limit).map(name => ({ name })) };
  }
}
const A = "a".repeat(40), B = "b".repeat(40), C = "c".repeat(40);
const r1 = "refs/heads/fix/chat", r2 = "refs/heads/fix/rag";
const setup = () => ({ TASKS: new FakeKV() });

describe("branch-scoped Octopus scheduling", () => {
  it("runs KV-consuming cron work only every six minutes on the free tier", () => {
    for (let minute = 0; minute < 1440; minute++) {
      assert.equal(shouldProcessBranchTick(minute * 60000), minute % 6 === 0);
    }
    assert.equal(3 * (1440 / 6), 720);
  });
  it("debounces latest SHA on a branch without touching other branches or GitHub statuses", async () => {
    const env = setup();
    await stagePush(env, {ref:r1,sha:A}, {now:1000});
    await stagePush(env, {ref:r1,sha:B}, {now:3000});
    await stagePush(env, {ref:r2,sha:C}, {now:4000});
    const started = [], launch = async t => {
      started.push(t); return {taskId:"task"+started.length,releaseVersion:"1.0"};
    };
    const early = await flushBranchQueue(env, launch, {now:32000,debounceMs:90000});
    assert.deepEqual(early.started, []);
    await flushBranchQueue(env, launch, {now:100000,debounceMs:90000});
    assert.deepEqual(started,[{ref:r1,sha:B}]);
    await flushBranchQueue(env, launch, {now:100000,debounceMs:90000});
    assert.deepEqual(started,[{ref:r1,sha:B},{ref:r2,sha:C}]);
    assert.equal(env.TASKS.data.has("result:"+A),false);
    assert.equal(env.TASKS.data.has("result:"+B),false);
  });
  it("does not relaunch a duplicate SHA on webhook redelivery or subsequent ticks", async () => {
    const env=setup();
    await stagePush(env,{ref:r1,sha:A},{now:1000});
    assert.equal((await stagePush(env,{ref:r1,sha:A},{now:2000})).kind,"duplicate");
    let attempts=0;
    const launch=async()=>{attempts++;return {taskId:"one",releaseVersion:"1"};};
    await flushBranchQueue(env,launch,{now:91010,debounceMs:90000});
    await flushBranchQueue(env,launch,{now:99000,debounceMs:90000});
    assert.equal(attempts,1);
  });
  it("never overlaps tasks on the same branch while allowing independent branches",async()=>{
    const env=setup();
    await stagePush(env,{ref:r1,sha:A},{now:1000});
    await stagePush(env,{ref:r2,sha:B},{now:1000});
    await env.TASKS.put("task:ServerTasks-1",JSON.stringify({ref:r1,sha:C,state:"pending"}));
    const started=[];
    await flushBranchQueue(env,async t=>{started.push(t);return {taskId:"task"};},{now:100000,debounceMs:90000});
    assert.deepEqual(started,[{ref:r2,sha:B}]);
  });
  it("fails closed when task listing exceeds its bounded budget",async()=>{
    const env=setup();await stagePush(env,{ref:r1,sha:A},{now:1000});
    for(let i=0;i<25;i++)await env.TASKS.put("task:"+String(i).padStart(3,"0"),JSON.stringify({ref:r2,sha:C}));
    let starts=0;
    const result=await flushBranchQueue(env,async()=>{starts++;},{now:100000,debounceMs:90000,taskLimit:20});
    assert.equal(starts,0);assert.equal(result.reason,"task_limit");
  });
  it("backs off failed creation, caps retries and never invents success",async()=>{
    const env=setup();await stagePush(env,{ref:r1,sha:A},{now:1000});let attempts=0;
    const failure=async()=>{attempts++;throw new Error("Octopus unavailable");};
    for(const now of [100000,120000,230000,400000])await flushBranchQueue(env,failure,{now,debounceMs:90000,maxAttempts:2,retryMs:120000});
    assert.equal(attempts,2);
    assert.notEqual(JSON.parse(await env.TASKS.get("result:"+A)??"{}").state,"success");
  });
  it("does not launch a superseded SHA",async()=>{
    const env=setup();
    await stagePush(env,{ref:r1,sha:A},{now:1000});
    await stagePush(env,{ref:r1,sha:B},{now:2000});
    const calls=[];
    await flushBranchQueue(env,async t=>{calls.push(t);return {taskId:"one"};},{now:100000,debounceMs:90000});
    assert.deepEqual(calls,[{ref:r1,sha:B}]);
  });
  it("fails closed for invalid refs and SHAs",async()=>{
    const env=setup();
    await assert.rejects(stagePush(env,{ref:"refs/tags/a",sha:A},{now:1000}));
    await assert.rejects(stagePush(env,{ref:r1,sha:"HEAD"},{now:1000}));
  });
  it("preserves distinct KV keys for slash-delimited refs",()=>{
    assert.notEqual(branchKey("refs/heads/a/b"),branchKey("refs/heads/a%2Fb"));
  });
});

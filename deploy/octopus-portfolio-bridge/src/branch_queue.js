// Tokenless, non-destructive, best-effort coalescing of pushes per Git branch.
// KV is eventually consistent: this reduces bursts, not a distributed lock.
// Never cancels an Octopus task or treats a missing/queued task as success.
const SHA = /^[0-9a-f]{40}$/;
const REF = /^refs\/heads\/[A-Za-z0-9_.\/-]+$/;
const TTL = 7 * 24 * 60 * 60;
// One cron batch per six minutes: three KV list operations x 240 ticks/day =
// 720 lists/day, within the Cloudflare Workers KV Free 1,000-list daily cap.
export const BRANCH_POLL_MINUTES = 6;
export const shouldProcessBranchTick = (now = Date.now()) =>
  Math.floor(now / 60000) % BRANCH_POLL_MINUTES === 0;
export const branchKey = ref => `desired:${encodeURIComponent(ref)}`;
const attemptedKey = sha => `attempted:${sha}`;
const parse = text => { try { return JSON.parse(text ?? 'null'); } catch { return null; } };

export async function stagePush(env, {ref, sha}, {now = Date.now()} = {}) {
  if (typeof ref !== 'string' || ref.length > 255 || !REF.test(ref) || ref.includes('..') ||
      typeof sha !== 'string' || !SHA.test(sha)) throw new Error('Invalid verification target');
  const key = branchKey(ref);
  const prior = parse(await env.TASKS.get(key));
  if (prior?.sha === sha) return {kind:'duplicate',sha};
  // No Octopus release and no success/pending verdict is fabricated here.
  // Earlier unstarted SHAs remain unknown; they never passed verification.
  await env.TASKS.put(key, JSON.stringify({ref,sha,seenAt:now}), {expirationTtl:TTL});
  return {kind:'staged',sha};
}

export async function flushBranchQueue(env, startVerification, {
  now=Date.now(), debounceMs=90000, retryMs=120000,
  maxAttempts=2, branchLimit=100, taskLimit=100,
}={}) {
  const desiredList = await env.TASKS.list({prefix:'desired:',limit:branchLimit+1});
  const taskList = await env.TASKS.list({prefix:'task:',limit:taskLimit+1});
  if (desiredList.keys.length>branchLimit) return {started:[],reason:'branch_limit'};
  // Conservative: no partial view of running branches may permit a new job.
  if (taskList.keys.length>=taskLimit) return {started:[],reason:'task_limit'};
  const activeRefs=new Set();
  for(const {name} of taskList.keys){
    const task=parse(await env.TASKS.get(name));
    if (!task || typeof task.ref!=='string') return {started:[],reason:'invalid_task'};
    activeRefs.add(task.ref);
  }
  const candidates=[];
  for(const {name} of desiredList.keys){
    const v=parse(await env.TASKS.get(name));
    if(!v||typeof v.sha!=='string'||!SHA.test(v.sha)||
       typeof v.ref!=='string'||branchKey(v.ref)!==name||!Number.isFinite(v.seenAt)) continue;
    if(now-v.seenAt < debounceMs || activeRefs.has(v.ref))continue;
    const attempt=parse(await env.TASKS.get(attemptedKey(v.sha)));
    if(attempt?.state==='started'||Number(attempt?.count??0)>=maxAttempts||now<Number(attempt?.retryAt??0))continue;
    candidates.push({v,attempt});
  }
  candidates.sort((a,b)=>a.v.seenAt-b.v.seenAt||a.v.ref.localeCompare(b.v.ref));
  const next=candidates[0];
  if(!next)return {started:[],reason:'not_ready'};
  const {ref,sha}=next.v;
  // Refuse a stale target if another push replaced it before the launch.
  const newest=parse(await env.TASKS.get(branchKey(ref)));
  if(newest?.sha!==sha)return {started:[],reason:'superseded'};
  const count=Number(next.attempt?.count??0)+1;
  await env.TASKS.put(attemptedKey(sha),JSON.stringify({count,retryAt:now+retryMs,state:'attempting'}),{expirationTtl:TTL});
  try {
    const result=await startVerification({ref,sha});
    await env.TASKS.put(attemptedKey(sha),JSON.stringify({count,state:'started',taskId:result.taskId}),{expirationTtl:TTL});
    return {started:[{ref,sha,taskId:result.taskId}]};
  } catch {
    // startVerification already writes an error verdict. Retry only after a
    // bounded backoff, never endlessly. Do not expose provider/API error text.
    return {started:[],reason:'start_failed'};
  }
}

import fetch from "node-fetch";

async function testPrompt(p, useMock = true) {
  const endpoint = useMock ? "http://localhost:3000/api/mock-ai" : "http://localhost:3000/api/ai";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: p }),
    });
    const { reply } = await res.json();
    console.log("✅ PROMPT:", p);
    console.log("📝 REPLY:", reply);
    console.log("-------");
  } catch (err) {
    console.log("❌ ERROR for prompt:", p);
    console.log("Error:", err.message);
    console.log("-------");
  }
}

const tests = [
  "Hello",
  "What tech does this site use?",
  "Who is Fuaad?",
  "Explain this portfolio like I'm five",
  "Tell me about RIZZK",
  "What is the 80/20 rule?",
  "What services do you offer?",
  "INVALID_PROMPT_TEST" // Test edge case
];

console.log("🚀 Starting AI Chat Box Tests (Using Mock API)...\n");
console.log("📊 Context Optimization: Prompts now use summaries + key points (< 1500 words total)\n");

for (const test of tests) {
  await testPrompt(test, true); // Use mock API
  // Small delay between requests
  await new Promise(resolve => setTimeout(resolve, 1000));
}

console.log("🎉 Testing complete!");
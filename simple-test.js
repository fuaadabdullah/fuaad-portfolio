// import fetch from "node-fetch";

try {
  const res = await fetch("http://localhost:3000/api/mock-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "Hello" }),
  });
  const data = await res.json();
  console.log("✅ SUCCESS!");
  console.log("Reply:", data.reply);
} catch (err) {
  console.log("❌ ERROR:", err.message);
}
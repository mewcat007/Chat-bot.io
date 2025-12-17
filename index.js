// Updated Free AI Telegram Bot with package.json ready for Mobile Deploy

// index.js import express from "express"; import fetch from "node-fetch";

const app = express(); app.use(express.json());

// ===== CONFIG ===== const BOT_TOKEN = "8154965585:AAGahEfmoQjCvZLG1r-CwlFfyUca38y8v20"; const GROQ_API_KEY = "YOUR_GROQ_API_KEY";

// ===== AI Function ===== async function askAI(userText) { const response = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", Authorization: Bearer ${GROQ_API_KEY}, }, body: JSON.stringify({ model: "llama3-8b-8192", messages: [ { role: "system", content: "You are a helpful AI assistant. Answer in Bangla if possible." }, { role: "user", content: userText }, ], }), });

const data = await response.json(); return data.choices[0].message.content; }

// ===== TELEGRAM WEBHOOK ===== app.post(/bot${BOT_TOKEN}, async (req, res) => { const msg = req.body.message; if (!msg || !msg.text) return res.sendStatus(200);

const chatId = msg.chat.id; const text = msg.text;

if (text === "/start") { await sendMessage(chatId, "🤖 AI Chat Bot-এ স্বাগতম! এখন যেকোনো প্রশ্ন করো।"); return res.sendStatus(200); }

const reply = await askAI(text); await sendMessage(chatId, reply);

res.sendStatus(200); });

// ===== Send message function ===== async function sendMessage(chatId, text) { await fetch(https://api.telegram.org/bot${BOT_TOKEN}/sendMessage, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text }), }); }

// ===== Server ===== app.get("/", (req, res) => res.send("AI Bot Running")); app.listen(3000, () => console.log("Server running on port 3000"));

/* ===== package.json ===== / / Copy this file as package.json in same folder */ { "name": "ai-telegram-bot", "version": "1.0.0", "type": "module", "dependencies": { "express": "^4.18.2", "node-fetch": "^3.3.2" }, "scripts": { "start": "node index.js" } }

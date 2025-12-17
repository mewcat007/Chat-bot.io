import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BOT_TOKEN = "8154965585:AAGahEfmoQjCvZLG1r-CwlFfyUca38y8v20";

app.post(`/bot${BOT_TOKEN}`, async (req, res) => {
  const msg = req.body.message;
  if (!msg) return res.sendStatus(200);

  const chatId = msg.chat.id;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "👋 Hello! Bot কাজ করছে 😍"
    })
  });

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Bot Running");
});

app.listen(3000);

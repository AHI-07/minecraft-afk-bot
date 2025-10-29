const mineflayer = require("mineflayer");
const express = require("express");

let bot;
let reconnecting = false;

function createBot() {
  bot = mineflayer.createBot({
    host: "snowkingdon.aternos.me",
    port: 33039,
    username: "AFK_Bot123",
  });

  bot.on("spawn", () => {
    console.log("✅ Bot joined the server!");

    // Random movement
    setInterval(() => {
      if (!bot.entity) return;

      const actions = ["forward", "back", "left", "right"];
      const action = actions[Math.floor(Math.random() * actions.length)];

      bot.setControlState(action, true);
      setTimeout(() => bot.setControlState(action, false), Math.random() * 2000 + 500);

      if (Math.random() < 0.3) {
        bot.setControlState("jump", true);
        setTimeout(() => bot.setControlState("jump", false), 400);
      }

      if (Math.random() < 0.4) {
        const yaw = Math.random() * Math.PI * 2;
        bot.look(yaw, 0, true);
      }
    }, 5000);

    bot.chat("🤖 I'm online and wandering!");
  });

  bot.on("end", () => {
    console.log("❌ Bot disconnected! Reconnecting soon...");
    if (!reconnecting) {
      reconnecting = true;
      setTimeout(() => {
        reconnecting = false;
        createBot();
      }, 10000);
    }
  });

  bot.on("error", (err) => console.log("⚠️ Error:", err.message));
}

createBot();

const app = express();
app.get("/", (req, res) => res.send("🤖 AFK Bot is online on Render!"));
app.listen(process.env.PORT || 3000, () => console.log("🌐 Web server running"));

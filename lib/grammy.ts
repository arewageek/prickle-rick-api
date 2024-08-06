import { Bot } from "grammy";

const connection = {
  isConnected: false,
};

const connectBot = () => {
  try {
    const apiKey = process.env.TELEGRAM_BOT_API!;
    const bot = new Bot(apiKey);
    if (!connection.isConnected) {
      bot.start();
      connection.isConnected = true;
    }
    return bot;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectBot;

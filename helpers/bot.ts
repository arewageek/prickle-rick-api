import { Bot } from "grammy";

const bot = new Bot(process.env.TELEGRAM_BOT_API!);

async function initialize() {
  bot.command("/start", (ctx) => {
    console.log({ ctx });
  });
}

// an api end point you can forward all commands and completion to
async function task(command: string, task: () => void) {
  bot.command(command, (ctx) => task);
}

module.exports = {
  bot: { initialize, task },
};

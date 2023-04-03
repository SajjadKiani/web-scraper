import TelegramBot from "node-telegram-bot-api";

import * as dotenv from 'dotenv'
dotenv.config()

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
  if (msg.text === '/start') {
    bot.sendMessage(msg.chat.id, `Your chat ID is ${msg.chat.id}`);
  }
});
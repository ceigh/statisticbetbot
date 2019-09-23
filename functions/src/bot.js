const Bot = require('node-telegram-bot-api');
const handlers = require('./handlers');


const createBot = (token, request = undefined, polling = true) => {
  const bot = new Bot(token, {polling, request});
  handlers.load(bot);
  return bot;
};


module.exports = createBot;

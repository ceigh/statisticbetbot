const Bot = require('node-telegram-bot-api');
const createReq = require('./createReq');
const handlers = require('../handlers');


const createBot = (token, opts = {}) => {
  opts.polling = process.env.NODE_ENV === 'development';
  opts.request = createReq();
  opts.webHook = process.env.NODE_ENV !== 'development' ? {
    port: process.env.PORT,
  } : undefined;

  const bot = new Bot(token, opts);
  handlers.load(bot);
  return bot;
};


module.exports = createBot;

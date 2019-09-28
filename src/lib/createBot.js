const Bot = require('node-telegram-bot-api');
const createReq = require('./createReq');
const handlers = require('./handlers');


const createBot = (token, opts = {}) => {
  const isDev = process.env.NODE_ENV === 'development';

  opts.polling = isDev;
  opts.request = createReq();
  opts.webHook = !isDev ? {port: process.env.PORT} : undefined;

  const bot = new Bot(token, opts);
  handlers.load(bot);
  return bot;
};


module.exports = createBot;

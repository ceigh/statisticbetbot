const Agent = require('socks5-https-client/lib/Agent');
const Bot = require('node-telegram-bot-api');
const handlers = require('./handlers');


const bot = new Bot(process.env.TOKEN, {
  polling: process.env.NODE_ENV === 'development',
  request: process.env.SOCKS_HOST ? {
    agentClass: Agent,
    agentOptions: {
      socksHost: process.env.SOCKS_HOST,
      socksPort: process.env.SOCKS_PORT,
      socksUsername: process.env.SOCKS_USERNAME,
      socksPassword: process.env.SOCKS_PASSWORD,
    },
  } : undefined,
});

handlers.load(bot);

console.log(`Bot server started in the ${process.env.NODE_ENV} mode.`);


module.exports = bot;

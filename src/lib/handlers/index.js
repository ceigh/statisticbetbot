const start = require('./start');
const help = require('./help');
const bet = require('./bet');
const stats = require('./stats');
const queries = require('../queries');


module.exports.load = bot => {
  bot.onText(/^\/start$/, msg => start(bot, msg));

  bot.onText(/^\/h(?:elp)? ?(\b\w+$|$)/,
             (msg, match) => help(bot, msg, match));

  bot.onText(/^\/b(?:et)? ['"](.+)['"] (\d+[.,]?\d*) (\d+[.,]?\d*)/,
             (msg, match) => bet(bot, msg, match));

  bot.onText(/^\/s(?:tats)?$/, msg => stats(bot, msg));

  bot.on('callback_query', query => {
    const act = query.data;
    if (queries.hasOwnProperty(act)) queries[act](bot, query);
  });
};

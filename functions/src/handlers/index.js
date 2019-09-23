const start = require('./start');
const help = require('./help');
const bet = require('./bet');
// const docs = require('../lib/docs');


module.exports.load = bot => {
  bot.onText(/^\/start$/, msg => start(bot, msg));

  bot.onText(/^\/h(?:elp)? ?(\b\w+$|$)/,
             (msg, match) => help(bot, msg, match));

  bot.onText(/^\/b(?:et)? ['"](.+)['"] (\d+[.,]?\d*) (\d+[.,]?\d*)/,
             (msg, match) => bet(bot, msg, match));

  // bot.on('message', msg => {
  //   const cmd = msg.text.split(' ')[0];
  //   if (docs.help[cmd.replace('/', '')]) return;
  //   bot.sendMessage(msg.chat.id, `Команды \`${cmd}\` не существует.`,
  //                   {parse_mode: 'Markdown'});
  // });
};

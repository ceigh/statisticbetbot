module.exports = (bot, msg) => {
  bot.sendMessage(msg.from.id,
                  `Привет, ${msg.from.username}!\n\n` + require('../lib/docs').start,
                  {parse_mode: 'Markdown'});
};

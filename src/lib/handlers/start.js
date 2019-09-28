module.exports = (bot, msg) => {
  bot.sendMessage(msg.from.id,
                  `Привет, ${msg.from.username}!\n\n` + require('../docs').start,
                  {parse_mode: 'Markdown'});
};

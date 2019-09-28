const docs = require('../docs');


module.exports = (bot, msg, match) => {
  // const cmd = match[1];
  // const txt = docs.help[cmd] || `Команды \`/${cmd}\` не существует.`;
  // bot.sendMessage(msg.from.id, txt, {parse_mode: 'Markdown'});

  const info = docs.help[match[1]];
  if (info) bot.sendMessage(msg.from.id, info, {parse_mode: 'Markdown'});
};

const parse = require('../operations').parseMsg;


module.exports = (bot, query) => {
  const msg = query.message;
  const data = parse(msg.text);
  bot.editMessageText(`❌ *- ${data.amount} ₽*`,
                      {
                        chat_id: msg.chat.id,
                        message_id: msg.message_id,
                        parse_mode: 'Markdown',
                        reply_markup: null,
                      });
};

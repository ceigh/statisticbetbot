const {parseMsg, addBet} = require('../../operations');


module.exports = (bot, query) => {
  const msg = query.message;
  const data = parseMsg(msg.text);
  let text;

  addBet(query.from.id, 0, data)
      .then(() => text = `Возврат *${data.amount} ₽*`)
      .catch(e => {
        console.error(e, query.from.id, query.from.username);
        text = `⚠️ *Ошибка*: _${e.detail}_`;
      })
      .finally(() =>
                   bot.editMessageText(text,
                                       {
                                         chat_id: msg.chat.id,
                                         message_id: msg.message_id,

                                         parse_mode: 'Markdown',
                                         reply_markup: null,
                                       }));
};

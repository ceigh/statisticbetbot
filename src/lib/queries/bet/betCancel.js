module.exports = (bot, query) => {
  const msg = query.message;
  bot.editMessageText('Отменено',
                      {
                        chat_id: msg.chat.id,
                        message_id: msg.message_id,
                        reply_markup: null,
                      });
};

module.exports = (bot, msg, match) => {
  const sum = Number(match[2].replace(',', '.'));
  const k = Number(match[3].replace(',', '.'));
  const profit = Math.round((sum * k - sum) * 100) / 100;
  const isOk = sum && k;
  const txt = isOk
              ? `Ставка:\n*${match[1]}*\n\nВозможная прибыль:\n*${profit} ₽*\nВозможная потеря:\n*${sum} ₽*`
              : `⚠️ *Ошибка*: _Wrong values._`;

  const keyboard = isOk
                   ? {
        inline_keyboard: [[
          {
            text: '✅',
            callback_data: 'betGood',
          }, {
            text: '❌',
            callback_data: 'betBad',
          }, {
            text: 'Возврат',
            callback_data: 'betBack',
          }, {
            text: 'Отмена',
            callback_data: 'betCancel',
          },
        ]],
      }
                   : null;

  bot.sendMessage(msg.from.id,
                  txt,
                  {
                    parse_mode: 'Markdown',
                    reply_markup: keyboard,
                  });
};

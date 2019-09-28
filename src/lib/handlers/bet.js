String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


module.exports = (bot, msg, match) => {
  const sum = Number(match[2].replace(',', '.'));
  const k = Number(match[3].replace(',', '.'));
  const profit = Math.round((sum * k - sum) * 100) / 100;

  bot.sendMessage(msg.from.id,
                  `Ставка:\n*${match[1].capitalize()}*\n\nВозможная прибыль:\n*${profit} ₽*\nВозможная потеря:\n*${sum} ₽*`,
                  {
                    parse_mode: 'Markdown',

                    reply_markup: {
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
                    },
                  });
};

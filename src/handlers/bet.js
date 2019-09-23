module.exports = (bot, msg, match) => {
  const sum = +match[2].replace(',', '.');
  const k = +match[3].replace(',', '.');
  const profit = Math.round((sum * k - sum) * 100) / 100;

  bot.sendMessage(msg.from.id,
                  `Ставка:\n*${match[1]}*\n\nВозможная прибыль:\n*${profit} ₽*\nВозможная потеря:\n*${sum} ₽*\n\n_Бот ждет результат _\`/push\`_\nДля отмены используйте _\`/stop\``,
                  {parse_mode: 'Markdown'});
};

const {formatStats, calcStats, getBets} = require('../operations');


module.exports = (bot, msg) => {
  const uid = msg.from.id;
  let txt;

  getBets(uid)
      .then(raw => calcStats(raw)
          .then(stats => txt = formatStats(stats)))
      .catch(e => {
        console.error(e, uid, msg.from.username);
        txt = `⚠️ *Ошибка*: _${e.detail}_`;
      })
      .finally(() => bot
          .sendMessage(uid, txt, {parse_mode: 'Markdown'}));
};

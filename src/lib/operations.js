const {Client} = require('pg');


const {DATABASE_URL} = process.env;
const ADD_BET_CFG = 'INSERT INTO bets(uid, result, bet, amount, profit)'
                    + ' VALUES($1, $2, $3, $4, $5)';
const GET_BETS_CFG = 'SELECT * FROM bets WHERE uid = $1';


const addBet = (uid, result, {bet, amount, profit}) => {
  return new Promise((resolve, reject) => {
    const client = new Client({connectionString: DATABASE_URL, ssl: true});
    client.connect();
    client.query(ADD_BET_CFG, [uid, result, bet, amount, profit],
                 (e, res) => {
                   client.end();
                   e ? reject(e) : resolve(res);
                 });
  });
};

const getBets = (uid) => {
  return new Promise((resolve, reject) => {
    const client = new Client({connectionString: DATABASE_URL, ssl: true});
    client.connect();
    client.query(GET_BETS_CFG, [uid],
                 (e, res) => {
                   client.end();
                   e ? reject(e) : res.rows.length
                                   ? resolve(res)
                                   : reject({detail: 'No data.'});
                 });
  });
};

const parseMsg = msg => {
  const lines = msg.split('\n');

  return {
    bet: lines[1],
    profit: Number(lines[4].slice(0, -2)),
    amount: Number(lines[6].slice(0, -2)),
  };
};

const calcStats = ({rows}) => {
  return new Promise(resolve => {
    const totalBets = rows.length;
    const totalWinBets = rows.map(r => r.result === 1 ? 1 : 0).reduce((a, b) => a + b, 0);
    const totalLostBets = rows.map(r => r.result === -1 ? 1 : 0).reduce((a, b) => a + b, 0);
    const totalReturnBets = rows.map(r => r.result === 0 ? 1 : 0).reduce((a, b) => a + b, 0);
    const winRate = 100 * (Math.round((totalWinBets / (totalBets - totalReturnBets)) * 100) / 100);

    const amounts = rows.map(r => r.result !== 0 ? Number(r.amount) : 0);
    const profits = rows.map(r => Number(r.profit));
    const losts = rows.map(r => r.result === -1 ? Number(r.amount) : 0);

    const totalAmount = amounts.reduce((a, b) => a + b, 0);
    const totalProfit = profits.reduce((a, b) => a + b, 0);
    const totalLost = losts.reduce((a, b) => a + b, 0);

    const avgAmount = Math.round((totalAmount / (totalBets - totalReturnBets)) * 100) / 100;
    const avgProfit = Math.round((totalProfit / (totalBets - totalReturnBets)) * 100) / 100;
    const avgLost = Math.round((totalLost / (totalBets - totalReturnBets)) * 100) / 100;

    const maxAmount = Math.max(...amounts);
    const maxProfit = Math.max(...profits);
    const maxLost = Math.max(...losts);

    const minAmount = Math.min(...amounts.filter(Boolean));
    const minProfit = Math.min(...profits.filter(Boolean));
    const minLost = Math.min(...losts.filter(Boolean));

    const data = {
      winRate,
      totalBets, totalWinBets, totalLostBets, totalReturnBets,
      totalAmount, totalProfit, totalLost,
      avgAmount, avgProfit, avgLost,
      maxAmount, maxProfit, maxLost,
      minAmount, minProfit, minLost,
    };
    resolve(data);
  });
};

const formatStats = d => {
  return `\`        Процент успеха 📈 %${d.winRate}

                Ставок ⚽ ${d.totalBets}
              Успешных ✅ ${d.totalWinBets}
             Неудачных ❌ ${d.totalLostBets}
           ️  Возвратов ↩ ${d.totalReturnBets}

      Всего поставлено 🗳 ₽${d.totalAmount}
        Всего выиграно 💰 ₽${d.totalProfit}
       Всего проиграно 🕳 ₽${d.totalLost}

        Средняя ставка 🧮 ₽${d.avgAmount}
       Средний выигрыш 🧲 ₽${d.avgProfit}
      Средний проигрыш 🧨 ₽${d.avgLost}

   Максимальная ставка ⬆️ ₽${d.maxAmount}
  Максимальный выигрыш ⤴️ ₽${d.maxProfit}
 Максимальный проигрыш ⏫ ₽${d.maxLost}

    Минимальная ставка ⬇️ ₽${d.minAmount}
   Минимальный выигрыш ⤵️ ₽${d.minProfit}
  Минимальный проигрыш ⏬ ₽${d.minLost}\``;
};

module.exports = {
  addBet,
  getBets,
  parseMsg,
  calcStats,
  formatStats,
};

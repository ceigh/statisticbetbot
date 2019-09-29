const {Client} = require('pg');


const {DATABASE_URL} = process.env;
const ADD_BET_CFG = 'INSERT INTO bets(uid, result, bet, amount, profit)'
                    + ' VALUES($1, $2, $3, $4, $5)';


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

const parseMsg = msg => {
  const lines = msg.split('\n');

  return {
    bet: lines[1],
    profit: Number(lines[4].slice(0, -2)),
    amount: Number(lines[6].slice(0, -2)),
  };
};


module.exports = {
  addBet,
  parseMsg,
};

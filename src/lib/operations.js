const usrHasData = usr => {
  const val = true;
  console.log(`${usr} has data: ${val}`);
  return val;
};

const waitMsg = usr => {
  console.log(`Wait msg from ${usr}.`);
};

const isWaitMsg = usr => {
  const val = true;
  console.log(`${usr} wait message: ${val}`);
  return val;
};

const addBet = (usr, bet) => {
  console.log(`Stored '${bet.txt}' bet to ${usr} with ${bet.val} amount.`);
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
  usrHasData,
  addBet,
  waitMsg,
  isWaitMsg,
  parseMsg,
};

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


module.exports = {
  usrHasData,
  addBet,
  waitMsg,
  isWaitMsg,
};

require('dotenv').config();
const {Client} = require('pg');


const {DATABASE_URL} = process.env;
const CLEAR_TABLE_CFG = 'DELETE FROM bets;';
const client = new Client({connectionString: DATABASE_URL, ssl: true});


client.connect();
client.query(CLEAR_TABLE_CFG, (err, res) => {
  client.end();
  if (err) throw err;
  console.log(res);
});

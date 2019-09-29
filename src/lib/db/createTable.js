require('dotenv').config();
const {Client} = require('pg');


const {DATABASE_URL} = process.env;
const CREATE_TABLE_CFG =
    `CREATE TABLE bets(uid    INT, 
                       bet    VARCHAR(512), 
                       amount numeric(9, 2), 
                       profit numeric(9, 2), 
                       result SMALLINT);`;
const client = new Client({connectionString: DATABASE_URL, ssl: true});


client.connect();
client.query(CREATE_TABLE_CFG, (err, res) => {
  client.end();
  if (err) throw err;
  console.log(res);
});

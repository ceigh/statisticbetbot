require('dotenv').config();

const createBot = require('./lib/createBot');
const launchApp = require('./lib/launchApp');


const token = process.env.TOKEN;
if (!token) throw Error('Specify token as env variable first.');

const bot = createBot(token);


launchApp(bot);

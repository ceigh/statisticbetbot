const functions = require('firebase-functions');
const web = require('./src/web');
const bot = require('./src/bot');


const app = web(bot(functions.config().betmanager.token));
const router = functions.https.onRequest(app);


module.exports = router;

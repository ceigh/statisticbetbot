const express = require('express');
const cors = require('cors');


const createApp = bot => {
  const app = express();

  app.use(cors({origin: true}));

  app.post(`/${bot.token}`, async (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  return app;
};


module.exports = createApp;

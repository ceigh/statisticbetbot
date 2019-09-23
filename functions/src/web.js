const express = require('express');


const createApp = bot => {
  const app = express();

  app.post(`/${bot.token}`, async (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  return app;
};


module.exports = createApp;

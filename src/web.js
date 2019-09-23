const express = require('express');
// const cors = require('cors');


const app = express();
// app.use(cors({ origin: true }));


module.exports = bot => {
  app.post(`/${bot.token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  return app;
};

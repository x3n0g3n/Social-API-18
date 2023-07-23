const express = require('express'),
      db = require('./config/connection'),
      routes = require('./routes'),
      PORT = process.env.PORT || 3001,
      app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// initialize variables and import required module
const express = require('express'),
      db = require('./config/connection'),
      routes = require('./routes'),
      PORT = process.env.PORT || 3001,
      app = express();

// parse URL-encoded form data 
app.use(express.urlencoded({ extended: true }));
// parse JSON data
app.use(express.json());
// use the defined routes for handling incoming requests
app.use(routes);

// start the server once the database connection has been established
db.once('open', () => {
  app.listen(PORT, () => {
    // log a message to the terminal
    console.log(`API server running on port ${PORT}!`);
  });
});

// initialize variables and import required module
const connection = require('../config/connection'),
      { User, Thought } = require('../models'),
      { usersArr } = require('./data');

// return error if there is an issue connecting to the database
connection.on('error', (err) => err);

// connection is established
connection.once('open', async () => {
  // log connected message to the terminal
  console.log('connected');

  // drop existing users
  await User.deleteMany({});

  // drop existing thoughts
  await Thought.deleteMany({});

  // create empty array to hold the users
  const users = [];

  // add users to the users array
  for (let i = 0; i < usersArr.length; i++) {
    // initialize variables
    const user = usersArr[i],
          { username, email } = user;

    // push the object with the current username and email
    users.push({
      username: username,
      email: email
    });
  }

  // add users to the collection and await the results
  await User.collection.insertMany(users);

  // log out the seed data to indicate what should appear in the database
  console.table(users);

  // log success message
  console.info('Seeding complete! 🌱');

  // exit the process
  process.exit(0);
});

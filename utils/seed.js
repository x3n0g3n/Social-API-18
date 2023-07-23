const connection = require('../config/connection'),
      { User, Thought } = require('../models'),
      { usersArr } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < usersArr.length; i++) {
   
    const user = usersArr[i],
          { username, email } = user;

    users.push({
      username: username,
      email: email
    });
  }

  await User.collection.insertMany(users);

  console.table(users);

  console.info('Seeding complete!');

  process.exit(0);
});

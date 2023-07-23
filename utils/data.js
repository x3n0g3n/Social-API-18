const usernames = [
    'AdamJenkins',
    'TJKennedy',
    'BrianCherry',
    'MichealRouter',
  ],
  emails = [
    'apple@example.com',
    'banana@example.com',
    'carrot@example.com',
    'doritos@example.com',
    ];
    
    const usersArr = usernames.map((username, index) => ({
      username: username,
      email: emails[index]
    }));


  module.exports = { usersArr };
    
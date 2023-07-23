const { User, Thought } = require('../models');
const countFriends = async () => {
  const getData = await User.aggregate() 
    .count('friendCount')
    .exec();
  const count = getData[0].friendCount;
  return count;
}

module.exports = {

  getUsers(req, res) {
    User.find()
      .select('-__v -friendCount')
     
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
 
  createUser(req, res) {
    User.create(req.body)
      .then(async (user) => {
        const newUser = user.toObject();
        delete newUser.__v;
        const friendCount = newUser.friends.length,
              userObj = {
                user: newUser,
                friendCount, 
              };
        return res.json(userObj);
      })
      .catch((err) => {
        if (err.code === 11000 && err.keyPattern && err.keyValue) {
          const duplicateKey = Object.keys(err.keyValue)[0],
                message = `The ${duplicateKey} already exists.`;
          return res.status(400).json({ message });
        }
        return res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    const { userId } = req.params;
    User.findOne({ _id: userId })
      .select('-__v')
      .then(async (user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with this ID.' })
        }
        const userObj = {
          user, 
          friendCount: await countFriends(), 
        };
        return res.json(userObj);
      })
      .catch((err) => res.status(500).json(err));
  },
 
  updateUser(req, res) {
    const { userId } = req.params;
    User.findOneAndUpdate(
      { _id: userId }, 
      { $set: req.body }, 
      { runValidators: true, new: true } 
    )
    .select('-__v')
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ message: 'No user with this ID.' });
      }
      const friendCount = await countFriends();
      user.friendCount = friendCount;
      return res.json({ user });
    })
    .catch((err) => res.status(500).json(err));
  },
  
  deleteUser(req, res) {
    const { userId } = req.params;
    User.findOneAndDelete({ _id: userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID.' })
          : Thought.deleteMany({ userId: userId }) 
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted.' }))
      .catch((err) => res.status(500).json(err));
  }
};

const { User } = require('../models');

module.exports = {
  /**
   @param {Object} req - The request object.
   @param {Object} res - The response object.
   */
  addFriend(req, res) {
    
    const { userId, friendId } = req.params;
    User.findById(userId)
      .select('-__v')
      .then((user) => {
    
        if (!user) {
          return res.status(404).json({ message: 'No user with this ID.' });
        }
        user.friends.push(friendId);
        return user.save();
      })
      .then((updatedUser) => {
       
        const updatedUserObj = updatedUser.toObject({ getters: true, versionKey: false });
       
        res.json(updatedUserObj);
      })
      .catch((err) => {
      
        res.status(500).json(err);
      });
  },

  /**
    @param {Object} req - The request object.
    @param {Object} res - The response object.
   */
  deleteFriend(req, res) {
    const { userId, friendId } = req.params;

    User.findById(userId)
     
      .select('-__v')
      .then((user) => {
       
        if (!user) {
          return res.status(404).json({ message: 'No user with this ID.' });
        }

        const friendIdx = user.friends.indexOf(friendId);

        if (friendIdx === -1) {
          return res.status(404).json({ message: 'No friend with this ID.' });
        }

        user.friends.splice(friendIdx, 1);

        return user.save();
      })
      .then((updatedUser) => {
       
        const updatedUserObj = updatedUser.toObject({ getters: true, versionKey: false });
       
        res.json(updatedUserObj);
      })
      .catch((err) => {
       
        res.status(500).json(err);
      });
  }
};

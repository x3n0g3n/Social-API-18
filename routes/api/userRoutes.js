// initialize variables and import required module
const router = require('express').Router(),
      { 
        getUsers,
        createUser,
        getSingleUser,
        updateUser,
        deleteUser,
      } = require('../../controllers/userController.js'),
      { 
        addFriend,
        deleteFriend,
      } = require('../../controllers/friendController.js');

// the path i:s /api/users
router.route('/').get(getUsers).post(createUser);

// the path is: /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// the path is: /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);


// export the routes
module.exports = router;
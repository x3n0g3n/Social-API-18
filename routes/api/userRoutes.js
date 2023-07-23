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

router.route('/').get(getUsers).post(createUser);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
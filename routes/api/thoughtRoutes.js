// initialize variables and import required module
const router = require('express').Router(),
      { 
        getThoughts,
        createThought,
        getSingleThought,
        updateThought,
        deleteThought,
      } = require('../../controllers/thoughtsController.js'),
      { 
        addReaction,
        deleteReaction,
      } = require('../../controllers/reactionController.js');

// the path is: /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// the path is: /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// the path is: /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

// export the routes
module.exports = router;
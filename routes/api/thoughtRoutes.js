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

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
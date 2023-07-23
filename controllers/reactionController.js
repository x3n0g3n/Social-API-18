const { Thought } = require('../models');

module.exports = {
  /**
   * @addReaction
   * adds a reaction to the thought
   * that is specified by id
   */
  addReaction(req, res) {
    // initialize variables
    const { thoughtId } = req.params,
      { reactionBody, username } = req.body,
      newReaction = {
        reactionBody,
        username
      };
    // find the thought by id
    Thought.findById(thoughtId)
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then((thought) => {
        if (!thought) {
          // if thought not found, return status 404 and error message
          return res.status(404).json({ message: 'No thought with this ID.' });
        }
        // add the new reaction to the thought's reactions array
        thought.reactions.push(newReaction);
        // save the updated thought object
        return thought.save()
          // convert updated thought to javascript object
          .then((updatedThought) => updatedThought.toObject({ getters: true, versionKey: false }));
      })
      // return updated data
      .then((updatedThought) => {
        // return the updated thought object with the new reaction added
        res.json(updatedThought);
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @deleteReaction
   * deletes a specific user based on id, along
   * with any associated thoughts
   */
  deleteReaction(req, res) {
    // initialize variables
    const { thoughtId } = req.params,
          { reactionId } = req.body;
    // find the thought by id
    Thought.findById(thoughtId)
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then((thought) => {
        if (!thought) {
          // if thought not found, return status 404 and error message
          return res.status(404).json({ message: 'No thought with this ID.' });
        }
        // find the index of the reaction to be deleted
        const reactionIdx = thought.reactions.findIndex(
          (reaction) => reaction._id.toString() === reactionId
        );
        // if the reaction is not found
        if (reactionIdx === -1) {
          // return status 404 and error message
          return res.status(404).json({ message: 'No reaction with this ID.' });
        }
        // remove the reaction from the thought's reactions array
        thought.reactions.splice(reactionIdx, 1);
        // save the updated thought object
        return thought.save()
        // convert updated thought to javascript object
        .then((updatedThought) => updatedThought.toObject({ getters: true, versionKey: false }));
      })
      // return updated data
      .then((updatedThought) => {
        // return the updated thought object after deleting the reaction
        res.json(updatedThought);
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  }
};

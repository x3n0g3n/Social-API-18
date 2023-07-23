const { Thought } = require('../models');

module.exports = {
  
  addReaction(req, res) {
    const { thoughtId } = req.params,
      { reactionBody, username } = req.body,
      newReaction = {
        reactionBody,
        username
      };
    Thought.findById(thoughtId)
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this ID.' });
        }
        thought.reactions.push(newReaction);
        return thought.save()
          .then((updatedThought) => updatedThought.toObject({ getters: true, versionKey: false }));
      })
      .then((updatedThought) => {
        res.json(updatedThought);
      })
      .catch((err) => res.status(500).json(err));
  },
  
  deleteReaction(req, res) {
    const { thoughtId } = req.params,
          { reactionId } = req.body;
    Thought.findById(thoughtId)
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this ID.' });
        }
        const reactionIdx = thought.reactions.findIndex(
          (reaction) => reaction._id.toString() === reactionId
        );
        if (reactionIdx === -1) {
          return res.status(404).json({ message: 'No reaction with this ID.' });
        }
        thought.reactions.splice(reactionIdx, 1);
        return thought.save()
        .then((updatedThought) => updatedThought.toObject({ getters: true, versionKey: false }));
      })
      .then((updatedThought) => {
        res.json(updatedThought);
      })
      .catch((err) => res.status(500).json(err));
  }
};

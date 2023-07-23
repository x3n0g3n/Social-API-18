const { Thought, User } = require('../models');

const countReactions = async (thoughtId) => {
  const thought = await Thought.findById(thoughtId),
        reactionCount = thought.reactions.length;
  return reactionCount;
}

module.exports = {
  
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .then(async (thoughts) => {
        const thoughtObj = [];
        for (const thought of thoughts) {
          const reactionCount = await countReactions(thought._id),
                thoughtWithReactions = thought.toObject();
          thoughtWithReactions.reactionCount = reactionCount;
          thoughtObj.push(thoughtWithReactions);
        }
        return res.json(thoughtObj);
      })
      .catch((err) => res.status(500).json(err));
  },
  
  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    Thought.create({ thoughtText, username, userId })
      .then(async (thought) => {
        const thoughtObject = thought.toObject();
        delete thoughtObject.__v;
        thoughtObject.reactionCount = 0;
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        )
        .then((updatedUser) => {
          res.json({ thought: thoughtObject, updatedUser });
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  
  getSingleThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findOne({ _id: thoughtId })
      .select('-__v')
      .then(async (thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this ID.' });
        }
        const reactionCount = await countReactions(thoughtId);
        const thoughtWithReactions = {
          ...thought.toObject(),
          reactionCount
        };
        res.json(thoughtWithReactions);
      })
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findOneAndUpdate(
      { _id: thoughtId }, 
      { $set: req.body }, 
      { runValidators: true, new: true } 
    ).then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findOneAndDelete({ _id: thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this ID.' });
        }
        return User.findOneAndUpdate(
          {},
          { $pull: { thoughts: thoughtId } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: 'Thought successfully deleted and removed from User\'s thought array.' });
      })
      .catch((err) => res.status(500).json(err));
  }
};

const { Thought, User } = require('../models');

/**
 * @countReactions
 * Uses the virtual property in the Thought model
 * to calculate the number of reactions to the
 * specified thought
 */
const countReactions = async (thoughtId) => {
  // initialize variables
  const thought = await Thought.findById(thoughtId),
        reactionCount = thought.reactions.length;
  return reactionCount;
}

module.exports = {
  /**
   * @getThoughts
   * returns a list of all thoughts
   */
  getThoughts(req, res) {
    // find all thoughts
    Thought.find()
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then(async (thoughts) => {
        // create an array to store thought objects with reaction count
        const thoughtObj = [];
        // iterate through each thought
        for (const thought of thoughts) {
          // initialize variables
          const reactionCount = await countReactions(thought._id),
                thoughtWithReactions = thought.toObject();
          // set the reaction count for the thought
          thoughtWithReactions.reactionCount = reactionCount;
          // add the thought object to the array
          thoughtObj.push(thoughtWithReactions);
        }
        // return the thought object
        return res.json(thoughtObj);
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @createThought
   * creates a new thought, using thought text
   * username, and user id
   */
  createThought(req, res) {
    // initialize variables
    const { thoughtText, username, userId } = req.body;
    // create a new thought
    Thought.create({ thoughtText, username, userId })
      // return the data
      .then(async (thought) => {
        // initialize variables
        const thoughtObject = thought.toObject();
        // exclude the '__v' field from the returned document
        delete thoughtObject.__v;
        // set the reaction count to 0
        thoughtObject.reactionCount = 0;
        // push the created thought's id to the user's thoughts array
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        )
        // return updated data
        .then((updatedUser) => {
          // return the created thought object with the reaction count and the updated user object
          res.json({ thought: thoughtObject, updatedUser });
        });
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @getSingleThought
   * returns a specific thought based on id
   */
  getSingleThought(req, res) {
    // initialize variables
    const { thoughtId } = req.params;
    // find thought using id param
    Thought.findOne({ _id: thoughtId })
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then(async (thought) => {
        if (!thought) {
          // if thought not found, return status 404 and error message
          return res.status(404).json({ message: 'No thought with this ID.' });
        }
        // get the reaction count for the thought
        const reactionCount = await countReactions(thoughtId);
        // create a new thought object with the reaction count
        const thoughtWithReactions = {
          ...thought.toObject(),
          reactionCount
        };
        // return the thought object with the reaction count
        res.json(thoughtWithReactions);
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @updateThought
   * updates a specific thought based on id
   */
  updateThought(req, res) {
    // initialize variables
    const { thoughtId } = req.params;
    // find and update a specific thought
    Thought.findOneAndUpdate(
      { _id: thoughtId }, // thought id
      { $set: req.body }, // data to update
      { runValidators: true, new: true } // run any validation necessary on the data
    // return data
    ).then((thought) =>
        !thought
          // if thought not found, return status 404 and error message
          ? res.status(404).json({ message: 'No thought with this ID.' })
          // else, return thought
          : res.json(thought)
      )
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @deleteThought
   * deletes a thought based on id
   */
  deleteThought(req, res) {
    // initialize variables
    const { thoughtId } = req.params;
    // find and delete a specific thought
    Thought.findOneAndDelete({ _id: thoughtId })
      .then((thought) => {
        if (!thought) {
          // if thought not found, return status 404 and error message
          return res.status(404).json({ message: 'No thought with this ID.' });
        }
        // remove the thought's ID from the user's thoughts array
        return User.findOneAndUpdate(
          {},
          { $pull: { thoughts: thoughtId } },
          { new: true }
        );
      })
      .then(() => {
        // return success message once the thought is deleted and removed from the user's thought array
        res.json({ message: 'Thought successfully deleted and removed from User\'s thought array.' });
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  }
};

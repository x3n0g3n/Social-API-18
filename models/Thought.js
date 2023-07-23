// initialize variables and import required module
const mongoose = require('mongoose'),
      { Schema, Types } = mongoose;

// create a new Mongoose schema
const reactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String, // type is a string
      required: true, // reactionBody is required
      maxlength: 280 // maximum length is 280 characters
    },
    username: {
      type: String, // type is a string
      required: true // username is required
    },
    createdAt: {
      type: Date, // type is a date
      default: Date.now, // default value is the current date
      get: timestamp => new Date(timestamp).toISOString() // formats the timestamp into an ISO string when queried
    }
  },
  {
    id: false  // exclude the default "id" field from the document
  }
);

// create a new Mongoose schema
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String, // type is a string
      required: true, // thought text is required
      minlength: 1, // minimum length is 1 character
      maxlength: 280 // maximum length is 280 characters
    },
    createdAt: {
      type: Date, // type is a date
      default: Date.now, // default value is the current date
      get: timestamp => new Date(timestamp).toISOString() // formats the timestamp into an ISO string when queried
    },
    username: {
      type: String, // type is a string
      required: true // userId is required
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reactions: [reactionSchema] // reactions field, an array of nested documents using reactionSchema
  },
  {
    toJSON: {
      virtuals: true, // include virtual properties when converting the document to JSON
      getters: true // apply getters, including virtual getters, when converting the document to JSON
    },
    id: false  // exclude the default "id" field from the document
  }
);

// define a virtual property called "reactionCount" using a getter function
thoughtSchema.virtual('reactionCount', {
  ref: 'Reaction',
  localField: '_id',
  foreignField: 'thoughtId',
  justOne: false, // Set justOne to false to populate an array of reactions
  count: true
});

// create the Thought model using the thoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;
const mongoose = require('mongoose'),
      { Schema, Types } = mongoose;

const reactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String, 
      required: true, 
      maxlength: 280 
    },
    username: {
      type: String, 
      required: true 
    },
    createdAt: {
      type: Date, 
      default: Date.now, 
      get: timestamp => new Date(timestamp).toISOString() 
    }
  },
  {
    id: false  
  }
);

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String, 
      required: true, 
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: timestamp => new Date(timestamp).toISOString() 
    },
    username: {
      type: String, 
      required: true 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reactions: [reactionSchema] 
  },
  {
    toJSON: {
      virtuals: true, 
      getters: true 
    },
    id: false  
  }
);


thoughtSchema.virtual('reactionCount', {
  ref: 'Reaction',
  localField: '_id',
  foreignField: 'thoughtId',
  justOne: false, 
  count: true
});


const Thought = mongoose.model('Thought', thoughtSchema);


module.exports = Thought;
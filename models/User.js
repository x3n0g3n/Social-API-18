// initialize variables and import required module
const mongoose = require('mongoose'),
      { Schema, Types } = mongoose;

// create a new Mongoose schema
const userSchema = new Schema(
  {
    username: {
      type: String, // type is string
      unique: true, // username must be unique
      required: true, // username is required
      trim: true // remove leading/trailing whitespace from the username
    },
    email: {
      type: String, // type is string
      required: true, // email is required
      unique: true, // email must be unique
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // email must match a valid email format
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId, // type is an object id
        ref: 'Thought' // references the thought schema
      }
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId, // type is an object id
        ref: 'User' // references the user schema
      }
    ]
  },
  {
    toJSON: {
      virtuals: true, // include virtual properties when converting the document to JSON
      getters: true // apply getters, including virtual getters, when converting the document to JSON
    },
    id: false  // exclude the default "id" field from the document
  }
);

// define a virtual property called "friendCount" using a getter function
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; // return the length of the friends array
});

// create the User model using the userSchema
const User = mongoose.model('User', userSchema);

// export the User model
module.exports = User;
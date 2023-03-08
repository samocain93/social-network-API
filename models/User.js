const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // regex for email validation
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      'Please enter a valid email address',
    ],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});











module.exports = User;
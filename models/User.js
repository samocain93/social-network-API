const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

userSchema.pre('remove', function(next) {
  console.log('Removing user and associated thoughts');
  Thought.deleteMany({ _id: { $in: this.thoughts } })
    .then(() => next())
    .catch((err) => next(err));
})

const User = model('User', userSchema);

module.exports = User;

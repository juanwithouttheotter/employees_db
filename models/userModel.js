const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: 'First name is required',
      trim: true,
    },
    last: {
      type: String,
      required: 'Last name is required',
    },
  },
  sex: {
    type: String,
    required: 'please select one of the options',
    trim: true,
    enum: ['male', 'female', 'no answer'],
  },
  birthday: {
    type: Date,
    required: 'Please select your birthday',
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

const mongoose = require('mongoose');

const User = new mongoose.Schema({
  customUsername: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  customPassword: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('CustomUser', User);

module.exports = User;

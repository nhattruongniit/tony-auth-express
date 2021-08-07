const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true 
  },
  role: {
    type: String,
    required: true 
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema);
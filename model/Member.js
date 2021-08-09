const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
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
  position: {
    type: String,
    required: true 
  },
  dateJoin: {
    type: String,
    required: true 
  },
  location: [
    {
      address: {
        type: String,
        required: true 
      },
      district: {
        type: String,
        required: true 
      },
      city: {
        type: String,
        required: true 
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Member', memberSchema);
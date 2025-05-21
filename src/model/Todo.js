const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'user'
  // },
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String
  },
  created_by: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('todo', todoSchema);
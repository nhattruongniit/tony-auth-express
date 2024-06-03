const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },
  image: {
    type: String
  },
  title: {
    type: String,
    require: true,
  },
  author: {
    type: Array,
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
  reported_by: {
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
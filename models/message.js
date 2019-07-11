const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const messageSchema = new Schema({
  user: String,
  message: String
});

const messageModel = mongoose.model('messageModel', messageSchema);

module.exports = messageModel;

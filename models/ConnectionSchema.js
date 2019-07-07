const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ConnectionSchema = new Schema({
  userId: String,
  tags: [String],
  name: String,
  company: String,
  cellphone: String,
  workphone: String,
  email: String,
  address: String,
  birthday: String,
  notes: String,
  urgency: Number,
  lastContacted: Number,
});

module.exports = mongoose.model('Connection', ConnectionSchema);

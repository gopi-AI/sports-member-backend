const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  weight: Number,
  age: Number,
  sex: String,
  sports: [String],
  team: String
});

module.exports = mongoose.model('Member', memberSchema);


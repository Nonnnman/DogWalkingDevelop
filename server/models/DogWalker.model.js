const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dogWalkerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  }
});

const DogWalker = mongoose.model('DogWalker', dogWalkerSchema);

module.exports = DogWalker;

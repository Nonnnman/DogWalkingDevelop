const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  dogOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DogOwner',
    required: true
  },
  dogWalker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DogWalker',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

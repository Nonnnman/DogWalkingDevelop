const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    walker: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    startTime: {
        type: String,
        required: false
      },
      endTime: {
        type: String,
        required: false
      }
})

module.exports = mongoose.model("Booking",BookingSchema);
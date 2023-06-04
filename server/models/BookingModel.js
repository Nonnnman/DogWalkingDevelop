const mongoose = require("mongoose");
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
  seg_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);

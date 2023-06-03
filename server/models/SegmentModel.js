const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SegmentSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Segment", SegmentSchema);

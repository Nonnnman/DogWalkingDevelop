const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  walker: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Rating", RatingSchema);

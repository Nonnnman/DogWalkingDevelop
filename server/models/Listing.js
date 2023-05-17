const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    walker_name: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    timestamp: {
        type: String,
        default: Date.now(),
    },
})

const Listing = mongoose.model("Listing",ListingSchema);

module.exports = Listing;
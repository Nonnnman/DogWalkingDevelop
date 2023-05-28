const listing = require("../models/ListingModel");

// get all
const getListings = async (req, res) => {
  const listings = await listing.find({}).sort({ createdAt: -1 });

  res.status(200).json(listings);
};

module.exports = {
  getListings,
};

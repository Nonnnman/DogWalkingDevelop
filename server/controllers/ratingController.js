const Rating = require("../models/RatingModel");
const mongoose = require("mongoose");

// get all ratings
const getRatings = async (req, res) => {
  const ratings = await Rating.find({}).sort({ createdAt: -1 });

  res.status(200).json(ratings);
};

// get specific user ratings
const getUserRatings = async (req, res) => {
  const { username } = req.params;

  const ratings = await Rating.find({ walker : username }).sort({ createdAt: -1 });

  res.status(200).json(ratings);
};

// get a single rating
const getRating = async (req, res) => {
  const { id } = req.params;

  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such rating" });
  }

  const rating = await Rating.findById(id);

  if (!rating) {
    return res.status(404).json({ error: "No such rating" });
  }

  res.status(200).json(rating);
};


// create new complete rating
const createRating = async (req, res) => {
  const { owner, walker, rating: stars, comment } = req.body;

  console.log("we are here");

  let emptyFields = [];

  /*if(!owner) {
    emptyFields.push('title')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }*/

  // add doc to db
  try {

    const rating = await Rating.create({ owner, walker, rating:stars , comment });
    res.status(200).json(rating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a rating
const deleteRating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such rating" });
  }

  const rating = await Rating.findOneAndDelete({ _id: id });

  if (!rating) {
    return res.status(400).json({ error: "No such rating" });
  }

  res.status(200).json(rating);
};

// update a workout
const updateRating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such rating" });
  }

  const rating = await Rating.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!rating) {
    return res.status(400).json({ error: "No such rating" });
  }

  res.status(200).json(rating);
};

module.exports = {
  getRatings,
  getUserRatings,
  getRating,
  createRating,
  deleteRating,
  updateRating,
};

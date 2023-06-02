const express = require("express");
const {
  getRatings,
  getRating,
  createRating,
  deleteRating,
  updateRating,
  getUserRatings,
} = require("../controllers/ratingController");

const router = express.Router();


//GET all ratings
router.get("/all", getRatings);

//GET user ratings
router.get("/:username", getUserRatings);

//GET a single rating
router.get("/id/:id", getRating);

//POST a rating
router.post("/", createRating);

// DELETE a rating
router.delete("/:id", deleteRating);

// UPDATE a rating
router.patch("/:id", updateRating);

module.exports = router;

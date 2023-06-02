const express = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  getUserBookings,
} = require("../controllers/bookingController");

const router = express.Router();


//GET all bookings
router.get("/all", getBookings);

//GET user bookings
router.get("/:username", getUserBookings);

//GET a single booking
router.get("/id/:id", getBooking);

//POST a booking
router.post("/", createBooking);

// DELETE a booking
router.delete("/:id", deleteBooking);

// UPDATE a booking
router.patch("/:id", updateBooking);

module.exports = router;

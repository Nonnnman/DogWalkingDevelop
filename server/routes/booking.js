const express = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
  createCompleteBooking,
  deleteBooking,
  updateBooking,
  getUserBookings,
} = require("../controllers/bookingController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

//GET all bookings
router.get("/all", getBookings);

//GET user bookings
router.get("/", getUserBookings);

//GET a single booking
router.get("/:id", getBooking);

//POST a booking
router.post("/", createBooking);

//POST a booking
router.post("/comp", createCompleteBooking);

// DELETE a booking
router.delete("/:id", deleteBooking);

// UPDATE a booking
router.patch("/:id", updateBooking);

module.exports = router;

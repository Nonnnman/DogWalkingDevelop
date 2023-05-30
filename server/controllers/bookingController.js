const Booking = require("../models/BookingModel");
const mongoose = require("mongoose");

// get all bookings
const getBookings = async (req, res) => {
  const bookings = await Booking.find({}).sort({ createdAt: -1 });

  res.status(200).json(bookings);
};

// get specific user bookings
const getUserBookings = async (req, res) => {
  const walker = req.user.username;

  //console.log(req.user)

  const bookings = await Booking.find({ walker }).sort({ createdAt: -1 });

  res.status(200).json(bookings);
};

// get a single booking
const getBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({ error: "No such booking" });
  }

  res.status(200).json(booking);
};


// create new complete booking
const createBooking = async (req, res) => {
  const { owner, walker, seg_id } = req.body;

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
    const booking = await Booking.create({ owner, walker, seg_id });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  const booking = await Booking.findOneAndDelete({ _id: id });

  if (!booking) {
    return res.status(400).json({ error: "No such booking" });
  }

  res.status(200).json(booking);
};

// update a workout
const updateBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  const booking = await Booking.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!booking) {
    return res.status(400).json({ error: "No such booking" });
  }

  res.status(200).json(booking);
};

module.exports = {
  getBookings,
  getUserBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
};

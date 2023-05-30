const Segment = require("../models/SegmentModel");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const User = require("../models/Profile");

// get all segments
const getSegments = async (req, res) => {
  const segments = await Segment.find({}).sort({ createdAt: -1 });

  res.status(200).json(segments);
};

// get all segments for a user
const getUserSegments = async (req, res) => {
  const { user } = req.params;

  const segments = await Segment.find({ user }).sort({ createdAt: -1 });

  res.status(200).json(segments);
};

// get a single segment
const getSegment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such segment" });
  }

  const segment = await Segment.findById(id);

  if (!booking) {
    return res.status(404).json({ error: "No such segment" });
  }

  res.status(200).json(segment);
};

// create new booking
const createSegment = async (req, res) => {
  const { start, end } = req.body;

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id }).select("username");
    const username = user.username;

    const segment = await Segment.create({ user: username, start, end });
    res.status(200).json(segment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a booking
const deleteSegment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  const segment = await Segment.findOneAndDelete({ _id: id });

  if (!segment) {
    return res.status(400).json({ error: "No such booking" });
  }

  res.status(200).json(segment);
};

module.exports = { getSegment, getSegments, getUserSegments, createSegment, deleteSegment };

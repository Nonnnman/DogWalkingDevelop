const User = require("../models/Profile");
const OwnerUser = require("../models/OwnerProfile");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

//get all owners
const getOwners = async (req, res) => {
  const owners = await OwnerUser.find({}).sort({ createdAt: -1 });

  res.status(200).json(owners);
};

//get a single owner
const getOwner = async (req, res) => {
  const { username } = req.params;  
  
  const owner = await OwnerUser.findOne({ username });

  console.log(owner);

  if (!owner) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(owner);
};

// get a single user
const getUser = async (req, res) => {
  const { username } = req.params;

  
  const user = await User.findOne({ username });

  console.log(user);
  
  
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

//login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ username, token, userType: user.userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signUpUser = async (req, res) => {
  const { username, password, userType } = req.body;

  try {
    const user = await User.signup(username, password, userType);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ username, token, userType: user.userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOneAndUpdate(
    { username },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};



module.exports = { 
  getUser,
  getUsers,
  signUpUser,
  loginUser,
  getOwner,
  getOwners,
  updateUser,
};

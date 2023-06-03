const express = require("express");

//controller functions
const {
  signUpUser,
  loginUser,
  getUsers,
  getUser,
  getOwners,
  getOwner,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

//GET all profiles
router.get("/", getUsers);

//GET all profiles
router.get("/owner", getOwners);

//GET a specific profile
router.get("/:username", getUser);

//GET a specific profile
router.get("/owner/:username", getOwner);

// login route
router.post("/login", loginUser);

// signup
router.post("/signup", signUpUser);

// add info to user
router.put("/:username", updateUser);

module.exports = router;

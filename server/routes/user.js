const express = require("express");

//controller functions
const {
  signUpUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

//GET all profiles
router.get("/", getUsers);

//GET a specific profile
router.get("/:id", getUser);

// login route
router.post("/login", loginUser);

// signup
router.post("/signup", signUpUser);

// UPDATE a booking
router.patch("/:id", updateUser);

module.exports = router;

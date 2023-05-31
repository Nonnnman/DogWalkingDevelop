const express = require("express");


//controller functions
const {signUpDogWalker, loginDogWalker, getDogWalker, getDogWalker, updateDogWalker } = require("../controllers/DogWalkerController");

const router = express.Router();

//GET all profiles
router.get('/', getDogWalker);

//GET a specific profile
router.get('/:id', getDogWalker)

// login route
router.post('/login', loginDogWalker);

// signup 
router.post('/signup', signUpDogWalker);

// UPDATE a booking
router.patch('/:id', updateDogWalker)

module.exports = router;
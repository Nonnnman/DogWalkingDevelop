const router = require('express').Router();
let DogWalker=require('../models/DogWalker.model');
// Get All DogWalker
router.route('/').get((req, res) => {
  DogWalker.find()
    .then(dogWalkers => res.json(dogWalkers))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Create new DogWalker
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  const newDogWalker = new DogWalker({
    name,
    email,
    phoneNumber,
  });

  newDogWalker.save()
    .then(() => res.json('Dog walker added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// find DogWalker by id
router.route('/:id').get((req, res) => {
  DogWalker.findById(req.params.id)
    .then(dogWalker => res.json(dogWalker))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DeleteDogWalker
router.route('/:id').delete((req, res) => {
  DogWalker.findByIdAndDelete(req.params.id)
    .then(() => res.json('Dog walker deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UpdateDogWalker
router.route('/update/:id').post((req, res) => {
  DogWalker.findById(req.params.id)
    .then(dogWalker => {
      dogWalker.name = req.body.name;
      dogWalker.email = req.body.email;
      dogWalker.phoneNumber = req.body.phoneNumber;

      dogWalker.save()
        .then(() => res.json('Dog walker updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

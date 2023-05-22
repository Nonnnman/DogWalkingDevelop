const router = require('express').Router();
const DogOwner = require('../models/DogOwner.model');
let DogOwner = require('../models/DogOwner.model');

router.route('/').get((req, res) => {
  DogOwner.find()
    .then(dogOwners => res.json(dogOwners))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const newDogOwner = new DogOwner({
    name,
    email,
    phoneNumber,
  });

  newDogOwner.save()
    .then(() => res.json('DogOwner added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    DogOwner.findById(req.params.id)
      .then(dogOwner => res.json(dogOwner))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    DogOwner.findByIdAndDelete(req.params.id)
      .then(() => res.json('Dog owner deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    DogOwner.findById(req.params.id)
      .then(dogOwner => {
        dogOwner.name = req.body.name;
        dogOwner.email = req.body.email;
        dogOwner.phoneNumber = req.body.phoneNumber;
  
        dogOwner
          .save()
          .then(() => res.json('Dog owner updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
const router = require('express').Router();
let DogWalker=require('../models/DogWalker.model');
// Get All DogWalker
//CalculateAvgRating
router.route('/dogwalkers').get((req, res) => {
  DogWalker.find()
    .then(dogWalker => {
      const dogWalkerWithAvgRating=dogWalker.map(dogWalker => {
        const totalRating = dogWalker.rating.reduce((sum, rating) => sum + rating, 0);
        const avgRating = totalRating / dogWalker.rating.length;
        return { ...dogWalker.toObject(), avgRating };
    });
    res.json(dogWalkerWithAvgRating);
    })

    .catch(err => res.status(400).json('Error: ' + err));

});

// Create new DogWalker
router.route('/dogwalkers/add').post((req, res) => {
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
router.route('/dogwalkers/:id').get((req, res) => {
  DogWalker.findById(req.params.id)
    .then(dogWalker => res.json(dogWalker))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DeleteDogWalker
router.route('/dogwalkers/:id').delete((req, res) => {
  DogWalker.findByIdAndDelete(req.params.id)
    .then(() => res.json('Dog walker deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UpdateDogWalker
router.route('/dogwalkers/update/:id').post((req, res) => {
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

//POST /DogWalker/:id
router.post('/dogwalkers/:id/reviews', async (req, res) => {
  try {
    const dogWalkerId = req.params.id;
    const { rating, comment } = req.body;

    // 根据传入的dogWalkerId查找相应的遛狗者findDogWalkerByID
    const dogWalker = await DogWalker.findById(dogWalkerId);

    if (!dogWalker) {
      return res.status(404).json({ error: 'Dog walker not found' });
    }

    // 创建新的评论对象new comment
    const newReview = {
      rating,
      comment,
    };

    // 将新的评论添加到遛狗者的评论列表中addNewComment
    dogWalker.reviews.push(newReview);

    // 保存更新后的遛狗者对象Save
    await DogWalker.save();

    res.json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


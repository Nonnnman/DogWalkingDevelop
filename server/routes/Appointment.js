const router = require('express').Router();
let Appointment = require('../models/Appointment.model');

// GetAllAppointment
router.route('/').get((req, res) => {
  Appointment.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json('Error: ' + err));
});

// CreateNewAppointment
router.route('/add').post((req, res) => {
  const dogOwnerId = req.body.dogOwnerId;
  const dogWalkerId = req.body.dogWalkerId;
  const appointmentDate = req.body.appointmentDate;

  const newAppointment = new Appointment({
    dogOwnerId,
    dogWalkerId,
    appointmentDate,
  });

  newAppointment.save()
    .then(() => res.json('Appointment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// FindAppointment ByID
router.route('/:id').get((req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DeleteAppointment
router.route('/:id').delete((req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Appointment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UpdateAppointment
router.route('/update/:id').post((req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => {
      appointment.dogOwnerId = req.body.dogOwnerId;
      appointment.dogWalkerId = req.body.dogWalkerId;
      appointment.appointmentDate = req.body.appointmentDate;

      appointment.save()
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

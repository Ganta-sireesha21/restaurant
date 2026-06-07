const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  createReservation,
  listReservations,
  listReservationsByUser,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/', protect, listReservations);
router.get('/user/:userId', protect, listReservationsByUser);
router.put('/:id', protect, updateReservation);
router.delete('/:id', protect, deleteReservation);

module.exports = router;

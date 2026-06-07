const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  listRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', listRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', protect, createRestaurant);
router.put('/:id', protect, updateRestaurant);
router.delete('/:id', protect, deleteRestaurant);

module.exports = router;

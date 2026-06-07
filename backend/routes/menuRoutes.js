const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  listMenus,
  getMenusByRestaurant,
  createMenu,
  updateMenu,
  deleteMenu
} = require('../controllers/menuController');

const router = express.Router();

router.get('/', listMenus);
router.get('/:restaurantId', getMenusByRestaurant);
router.post('/', protect, createMenu);
router.put('/:id', protect, updateMenu);
router.delete('/:id', protect, deleteMenu);

module.exports = router;

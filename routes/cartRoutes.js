const express = require('express');
const {
  getOrCreateCart,
  addToCart,
  updateCartItem,
  removeFromCart
} = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getOrCreateCart)
  .post(addToCart)
  .put(updateCartItem)
  .delete(removeFromCart);

module.exports = router;
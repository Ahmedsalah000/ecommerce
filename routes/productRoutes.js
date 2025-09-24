const express = require('express');
const {
  getProducts,
  getProductById,
  getProductsBySearch
} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getProducts);

router.get('/search', protect, getProductsBySearch);

router.route('/:id')
  .get(getProductById);

module.exports = router;

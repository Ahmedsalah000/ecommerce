const express = require('express');
const {
  createProduct,
  getSellerProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/sellerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// All routes require authentication and seller authorization
router.use(protect, authorize('seller'));

router.route('/products')
  .post(createProduct)
  .get(getSellerProducts);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
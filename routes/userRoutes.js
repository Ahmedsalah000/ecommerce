const express = require('express');
const { updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/profile')
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

module.exports = router;
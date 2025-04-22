const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validateMiddleware');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  updateSubscription,
  getDailyCredits
} = require('../controllers/authController');

// Validation middleware
const registerValidation = [
  body('username').trim().isLength({ min: 3, max: 30 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

// Public routes
router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateUserProfile);
router.put('/subscription', protect, updateSubscription);
router.get('/credits', protect, getDailyCredits);

module.exports = router; 
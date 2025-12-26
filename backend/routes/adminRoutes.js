const express = require('express');
const { 
  registerAdmin, 
  loginAdmin, 
  getAdminProfile 
} = require('../controllers/adminAuthController');
const { protectAdmin } = require('../middleware/adminAuth');

const router = express.Router();

// Admin Authentication
router.post('/auth/register', registerAdmin);
router.post('/auth/login', loginAdmin);
router.get('/auth/me', protectAdmin, getAdminProfile);

module.exports = router;
const express = require('express');
const { 
  getAllPayments, 
  getPaymentStats,
  getPaymentById 
} = require('../controllers/adminPaymentController');
const { protectAdmin } = require('../middleware/adminAuth');

const router = express.Router();

// All routes are admin protected
router.use(protectAdmin);

router.get('/', getAllPayments);           // Get all payments with filters
router.get('/stats', getPaymentStats);     // Get payment statistics
router.get('/:id', getPaymentById);        // Get single payment

module.exports = router;
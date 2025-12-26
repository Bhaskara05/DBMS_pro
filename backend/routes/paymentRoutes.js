const express = require('express');
const { getPaymentByBooking } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, getPaymentByBooking);

module.exports = router;
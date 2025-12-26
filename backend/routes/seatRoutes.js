const express = require('express');
const { createSeats, getSeatsByScreen } = require('../controllers/seatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createSeats); // Admin auth can be added
router.get('/:screenId', getSeatsByScreen);

module.exports = router;
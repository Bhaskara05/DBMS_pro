const express = require('express');
const { createSeats, getSeatsByScreen } = require('../controllers/seatController');
const { protectAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.use(protectAdmin);

router.post('/', createSeats);
router.get('/:screenId', getSeatsByScreen);

module.exports = router;
const express = require('express');
const { createScreen } = require('../controllers/screenController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createScreen); // Admin auth can be added

module.exports = router;
const express = require('express');
const { createShow, getShowsByMovie } = require('../controllers/showController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createShow); // Admin auth can be added
router.get('/:movieId', getShowsByMovie);

module.exports = router;
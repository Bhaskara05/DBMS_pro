const express = require('express');
const { createShow, getShowsByMovie } = require('../controllers/showController');
const { protectAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.use(protectAdmin);

router.post('/', createShow);
router.get('/:movieId', getShowsByMovie);

module.exports = router;
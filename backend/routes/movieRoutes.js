const express = require('express');
const { getMovies, createMovie } = require('../controllers/movieController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getMovies)
  .post(protect, createMovie); // Admin auth can be added

module.exports = router;
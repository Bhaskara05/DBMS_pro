const express = require('express');
const { 
  createMovie, 
  updateMovie, 
  deleteMovie,
  getMovies,
  getMovieById
} = require('../controllers/movieController');
const { protectAdmin } = require('../middleware/adminAuth');

const router = express.Router();

// All routes are admin protected
router.use(protectAdmin);

router.route('/')
  .get(getMovies)      // Get all movies
  .post(createMovie);   // Create movie

router.route('/:id')
  .get(getMovieById)    // Get single movie
  .put(updateMovie)     // Update movie
  .delete(deleteMovie); // Delete movie

module.exports = router;
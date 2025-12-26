const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new movie
// @route   POST /api/movies
// @access  Private (Admin only)
exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update movie
// @route   PUT /api/admin/movies/:id
// @access  Private (Admin only)
exports.updateMovie = async (req, res, next) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete movie
// @route   DELETE /api/admin/movies/:id
// @access  Private (Admin only)
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    await movie.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    next(error);
  }
};
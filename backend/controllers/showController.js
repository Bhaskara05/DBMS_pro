const Show = require('../models/Show');
const Movie = require('../models/Movie');
const Screen = require('../models/Screen');

// @desc    Create new show
// @route   POST /api/shows
// @access  Private (Admin only)
exports.createShow = async (req, res, next) => {
  try {
    const { movieId, screenId } = req.body;

    // Verify movie and screen exist
    const movie = await Movie.findById(movieId);
    const screen = await Screen.findById(screenId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: 'Screen not found'
      });
    }

    const show = await Show.create(req.body);

    res.status(201).json({
      success: true,
      data: show
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all shows for a movie
// @route   GET /api/shows/:movieId
// @access  Public
exports.getShowsByMovie = async (req, res, next) => {
  try {
    const shows = await Show.find({ movieId: req.params.movieId })
      .populate('movieId', 'title language duration')
      .populate('screenId', 'screenName totalSeats');

    res.status(200).json({
      success: true,
      count: shows.length,
      data: shows
    });
  } catch (error) {
    next(error);
  }
};
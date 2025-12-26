const Seat = require('../models/Seat');
const Screen = require('../models/Screen');

// @desc    Create seats for a screen
// @route   POST /api/seats
// @access  Private (Admin only)
exports.createSeats = async (req, res, next) => {
  try {
    const { screenId, seats } = req.body;

    // Verify screen exists
    const screen = await Screen.findById(screenId);
    if (!screen) {
      return res.status(404).json({
        success: false,
        message: 'Screen not found'
      });
    }

    // Add screenId to each seat
    const seatsWithScreen = seats.map(seat => ({
      ...seat,
      screenId
    }));

    const createdSeats = await Seat.insertMany(seatsWithScreen);

    res.status(201).json({
      success: true,
      count: createdSeats.length,
      data: createdSeats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all seats for a screen
// @route   GET /api/seats/:screenId
// @access  Public
exports.getSeatsByScreen = async (req, res, next) => {
  try {
    const seats = await Seat.find({ screenId: req.params.screenId });

    res.status(200).json({
      success: true,
      count: seats.length,
      data: seats
    });
  } catch (error) {
    next(error);
  }
};
const Screen = require('../models/Screen');

// @desc    Create new screen
// @route   POST /api/screens
// @access  Private (Admin only)
exports.createScreen = async (req, res, next) => {
  try {
    const screen = await Screen.create(req.body);

    res.status(201).json({
      success: true,
      data: screen
    });
  } catch (error) {
    next(error);
  }
};
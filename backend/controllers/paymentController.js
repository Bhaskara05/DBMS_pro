const Payment = require('../models/Payment');

// @desc    Get payment details
// @route   POST /api/payments
// @access  Private
exports.getPaymentByBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const payment = await Payment.findOne({ bookingId })
      .populate('bookingId');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// @desc    Get all payments (Admin only)
// @route   GET /api/admin/payments
// @access  Private (Admin)
exports.getAllPayments = async (req, res, next) => {
  try {
    const { status, method, fromDate, toDate } = req.query;

    // Build query
    let query = {};

    if (status) {
      query.paymentStatus = status;
    }

    if (method) {
      query.paymentMethod = method;
    }

    if (fromDate || toDate) {
      query.paidAt = {};
      if (fromDate) {
        query.paidAt.$gte = new Date(fromDate);
      }
      if (toDate) {
        query.paidAt.$lte = new Date(toDate);
      }
    }

    const payments = await Payment.find(query)
      .populate({
        path: 'bookingId',
        populate: [
          {
            path: 'userId',
            select: 'name email phone'
          },
          {
            path: 'showId',
            populate: [
              { path: 'movieId', select: 'title language' },
              { path: 'screenId', select: 'screenName' }
            ]
          }
        ]
      })
      .sort('-paidAt');

    // Calculate total revenue
    const totalRevenue = payments.reduce((sum, payment) => {
      if (payment.paymentStatus === 'SUCCESS') {
        return sum + payment.amount;
      }
      return sum;
    }, 0);

    res.status(200).json({
      success: true,
      count: payments.length,
      totalRevenue,
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment statistics (Admin only)
// @route   GET /api/admin/payments/stats
// @access  Private (Admin)
exports.getPaymentStats = async (req, res, next) => {
  try {
    const stats = await Payment.aggregate([
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const methodStats = await Payment.aggregate([
      {
        $match: { paymentStatus: 'SUCCESS' }
      },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Get today's revenue
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRevenue = await Payment.aggregate([
      {
        $match: {
          paymentStatus: 'SUCCESS',
          paidAt: { $gte: today }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalBookings: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        paymentStatusStats: stats,
        paymentMethodStats: methodStats,
        todayStats: todayRevenue.length > 0 ? todayRevenue[0] : { totalRevenue: 0, totalBookings: 0 }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment by ID (Admin only)
// @route   GET /api/admin/payments/:id
// @access  Private (Admin)
exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: 'bookingId',
        populate: [
          {
            path: 'userId',
            select: 'name email phone'
          },
          {
            path: 'showId',
            populate: [
              { path: 'movieId', select: 'title language duration genre' },
              { path: 'screenId', select: 'screenName totalSeats' }
            ]
          }
        ]
      });

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
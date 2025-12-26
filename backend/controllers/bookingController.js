const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Show = require('../models/Show');
const Payment = require('../models/Payment');

// Generate unique ticket number
const generateTicketNumber = () => {
  return 'TKT' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// @desc    Create new booking with payment (Transaction)
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  // Start MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { showId, seatNumbers, paymentMethod } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!showId || !seatNumbers || !Array.isArray(seatNumbers) || seatNumbers.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Please provide showId and seatNumbers array'
      });
    }

    if (!paymentMethod || !['UPI', 'Card', 'Cash'].includes(paymentMethod)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Please provide valid payment method (UPI/Card/Cash)'
      });
    }

    // Step 1: Check show availability
    const show = await Show.findById(showId).session(session);
    
    if (!show) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    // Step 2: Check seat availability (prevent double booking)
    const unavailableSeats = seatNumbers.filter(seat => 
      show.bookedSeats.includes(seat)
    );

    if (unavailableSeats.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: `Seats already booked: ${unavailableSeats.join(', ')}`
      });
    }

    // Step 3: Calculate total amount
    const totalAmount = seatNumbers.length * show.pricePerSeat;

    // Step 4: Generate tickets with unique ticket numbers
    const tickets = seatNumbers.map(seatNumber => ({
      seatNumber,
      ticketNumber: generateTicketNumber()
    }));

    // Step 5: Create Booking with embedded tickets
    const booking = await Booking.create([{
      userId,
      showId,
      totalAmount,
      status: 'CONFIRMED',
      tickets
    }], { session });

    // Step 6: Update bookedSeats atomically
    await Show.findByIdAndUpdate(
      showId,
      { $push: { bookedSeats: { $each: seatNumbers } } },
      { session }
    );

    // Step 7: Create Payment (simulate payment processing)
    const paymentStatus = 'SUCCESS'; // In real app, integrate payment gateway

    const payment = await Payment.create([{
      bookingId: booking[0]._id,
      paymentMethod,
      paymentStatus,
      amount: totalAmount
    }], { session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Populate booking details for response
    const populatedBooking = await Booking.findById(booking[0]._id)
      .populate('userId', 'name email phone')
      .populate({
        path: 'showId',
        populate: [
          { path: 'movieId', select: 'title language duration' },
          { path: 'screenId', select: 'screenName' }
        ]
      });

    res.status(201).json({
      success: true,
      data: {
        booking: populatedBooking,
        payment: payment[0]
      }
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// @desc    Get all bookings for a user
// @route   GET /api/bookings/user/:userId
// @access  Private
exports.getBookingsByUser = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('userId', 'name email phone')
      .populate({
        path: 'showId',
        populate: [
          { path: 'movieId', select: 'title language duration' },
          { path: 'screenId', select: 'screenName' }
        ]
      })
      .sort('-bookingDate');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};
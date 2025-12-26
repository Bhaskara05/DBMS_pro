const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Please provide booking ID'],
    unique: true
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please provide payment method'],
    enum: {
      values: ['UPI', 'Card', 'Cash'],
      message: 'Payment method must be UPI, Card, or Cash'
    }
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: {
      values: ['SUCCESS', 'FAILED'],
      message: 'Payment status must be SUCCESS or FAILED'
    }
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
    min: [0, 'Amount cannot be negative']
  },
  paidAt: {
    type: Date,
    default: Date.now
  }
});

// Relationship: One Payment belongs to one Booking (via bookingId)

module.exports = mongoose.model('Payment', paymentSchema);
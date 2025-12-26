const mongoose = require('mongoose');

// Embedded Ticket Schema
const ticketSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true
  },
  ticketNumber: {
    type: String,
    required: true,
    unique: true
  }
}, { _id: false });

// Relationship: Ticket exists only inside Booking (embedded document)

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user ID']
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: [true, 'Please provide show ID']
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  totalAmount: {
    type: Number,
    required: [true, 'Please provide total amount'],
    min: [0, 'Amount cannot be negative']
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['CONFIRMED', 'CANCELLED'],
      message: 'Status must be CONFIRMED or CANCELLED'
    },
    default: 'CONFIRMED'
  },
  tickets: {
    type: [ticketSchema],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one ticket is required'
    }
  }
});

// Relationship: One Booking belongs to one User (via userId)
// Relationship: One Booking belongs to one Show (via showId)
// Relationship: One Booking generates many Tickets (embedded tickets array)

module.exports = mongoose.model('Booking', bookingSchema);
const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Please provide movie ID']
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Screen',
    required: [true, 'Please provide screen ID']
  },
  showDate: {
    type: String,
    required: [true, 'Please provide show date (YYYY-MM-DD)'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format']
  },
  showTime: {
    type: String,
    required: [true, 'Please provide show time (HH:MM)'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format']
  },
  pricePerSeat: {
    type: Number,
    required: [true, 'Please provide price per seat'],
    min: [0, 'Price cannot be negative']
  },
  bookedSeats: {
    type: [String],
    default: []
  }
});

// Relationship: Each Show belongs to one Movie (via movieId)
// Relationship: Each Show runs on one Screen (via screenId)
// Relationship: One Show can have many Bookings (referenced in Booking model)

// Index to prevent double booking same screen at same time
showSchema.index({ screenId: 1, showDate: 1, showTime: 1 }, { unique: true });

module.exports = mongoose.model('Show', showSchema);
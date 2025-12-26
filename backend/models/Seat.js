const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Screen',
    required: [true, 'Please provide screen ID']
  },
  seatNumber: {
    type: String,
    required: [true, 'Please provide seat number'],
    trim: true
  },
  seatType: {
    type: String,
    required: [true, 'Please provide seat type'],
    enum: {
      values: ['Normal', 'Premium'],
      message: 'Seat type must be Normal or Premium'
    }
  }
});

// Relationship: Each Seat belongs to one Screen (via screenId)

// Compound unique index to prevent duplicate seat numbers in same screen
seatSchema.index({ screenId: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model('Seat', seatSchema);
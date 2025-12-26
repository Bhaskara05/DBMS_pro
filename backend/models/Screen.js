const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  screenName: {
    type: String,
    required: [true, 'Please provide screen name'],
    unique: true,
    trim: true
  },
  totalSeats: {
    type: Number,
    required: [true, 'Please provide total seats'],
    min: [1, 'Total seats must be at least 1']
  }
});

// Relationship: One Screen contains many Seats (referenced in Seat model)
// Relationship: One Screen hosts many Shows (referenced in Show model)

module.exports = mongoose.model('Screen', screenSchema);
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide movie title'],
    trim: true
  },
  language: {
    type: String,
    required: [true, 'Please provide movie language'],
    trim: true
  },
  genre: {
    type: [String],
    required: [true, 'Please provide at least one genre'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one genre is required'
    }
  },
  duration: {
    type: Number,
    required: [true, 'Please provide movie duration in minutes'],
    min: [1, 'Duration must be at least 1 minute']
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please provide release date']
  }
});

// Relationship: One Movie can have many Shows (referenced in Show model)

module.exports = mongoose.model('Movie', movieSchema);
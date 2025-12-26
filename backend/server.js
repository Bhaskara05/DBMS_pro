const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to database
connectDatabase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/screens', require('./routes/screenRoutes'));
app.use('/api/seats', require('./routes/seatRoutes'));
app.use('/api/shows', require('./routes/showRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Admin Routes (NEW)
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/movies', require('./routes/adminMovieRoutes'));
app.use('/api/admin/payments', require('./routes/adminPaymentRoutes'));
app.use('/api/admin/screens', require('./routes/adminScreenRoutes'));
app.use('/api/admin/seats', require('./routes/adminSeatRoutes'));
app.use('/api/admin/shows', require('./routes/adminShowRoutes'));

// Error handler middleware (must be last)
app.use(errorHandler);

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Movie Booking API is running',
    version: '1.0.0',
    endpoints: {
      users: '/api',
      admin: '/api/admin'
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
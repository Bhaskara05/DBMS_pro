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

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/screens', require('./routes/screenRoutes'));
app.use('/api/seats', require('./routes/seatRoutes'));
app.use('/api/shows', require('./routes/showRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Error handler (always last)
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

# 🎬 Online Movie Ticket Booking System - Backend API

A complete RESTful API backend for a single-theatre movie ticket booking system built with Node.js, Express.js, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Frontend Integration Guide](#frontend-integration-guide)
- [Transaction Flow](#transaction-flow)
- [Error Handling](#error-handling)

---

## ✨ Features

- ✅ **User Authentication** - JWT-based register & login
- ✅ **Movie Management** - Add and list movies
- ✅ **Screen & Seat Management** - Configure theatre screens and seats
- ✅ **Show Scheduling** - Create shows for movies with pricing
- ✅ **Atomic Booking System** - Transaction-based booking to prevent double booking
- ✅ **Payment Integration** - Payment processing with booking
- ✅ **Booking History** - User-specific booking retrieval
- ✅ **Seat Availability** - Real-time seat availability checking

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

---

## 📊 Database Schema

### Entity Relationships

```
User (1) ──────< (M) Booking
Movie (1) ──────< (M) Show
Screen (1) ──────< (M) Show
Screen (1) ──────< (M) Seat
Show (1) ──────< (M) Booking
Booking (1) ────< (1) Payment
Booking (1) ──────< (M) Ticket (Embedded)
```

### Collections

1. **users** - User accounts
2. **movies** - Movie catalog
3. **screens** - Theatre screens
4. **seats** - Seats in each screen
5. **shows** - Movie showtimes
6. **bookings** - Ticket bookings (with embedded tickets)
7. **payments** - Payment records

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Steps

```bash
# Clone the repository
git clone <repository-url>
cd movie-booking-system

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI, JWT_SECRET, etc.

# Start MongoDB (if running locally)
mongod

# Run the server
npm run dev    # Development mode with nodemon
npm start      # Production mode
```

The server will start on `http://localhost:5000`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie_booking
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d
NODE_ENV=development
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Header
For protected routes, include JWT token:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔑 Authentication APIs

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

---

## 🎬 Movie APIs

### 3. Get All Movies
**GET** `/api/movies`

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Inception",
      "language": "English",
      "genre": ["Action", "Sci-Fi", "Thriller"],
      "duration": 148,
      "releaseDate": "2010-07-16T00:00:00.000Z"
    }
  ]
}
```

### 4. Create Movie
**POST** `/api/movies` 🔒

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Inception",
  "language": "English",
  "genre": ["Action", "Sci-Fi", "Thriller"],
  "duration": 148,
  "releaseDate": "2010-07-16"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Inception",
    "language": "English",
    "genre": ["Action", "Sci-Fi", "Thriller"],
    "duration": 148,
    "releaseDate": "2010-07-16T00:00:00.000Z"
  }
}
```

---

## 🖥 Screen APIs

### 5. Create Screen
**POST** `/api/screens` 🔒

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "screenName": "Screen 1",
  "totalSeats": 100
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "screenName": "Screen 1",
    "totalSeats": 100
  }
}
```

---

## 💺 Seat APIs

### 6. Create Seats
**POST** `/api/seats` 🔒

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "screenId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "seats": [
    { "seatNumber": "A1", "seatType": "Normal" },
    { "seatNumber": "A2", "seatType": "Normal" },
    { "seatNumber": "A3", "seatType": "Premium" }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "screenId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "seatNumber": "A1",
      "seatType": "Normal"
    }
  ]
}
```

### 7. Get Seats by Screen
**GET** `/api/seats/:screenId`

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "screenId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "seatNumber": "A1",
      "seatType": "Normal"
    }
  ]
}
```

---

## 🎭 Show APIs

### 8. Create Show
**POST** `/api/shows` 🔒

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "movieId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "screenId": "64a1b2c3d4e5f6g7h8i9j0k2",
  "showDate": "2024-12-30",
  "showTime": "18:00",
  "pricePerSeat": 250
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
    "movieId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "screenId": "64a1b2c3d4e5f6g7h8i9j0k2",
    "showDate": "2024-12-30",
    "showTime": "18:00",
    "pricePerSeat": 250,
    "bookedSeats": []
  }
}
```

### 9. Get Shows by Movie
**GET** `/api/shows/:movieId`

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
      "movieId": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "title": "Inception",
        "language": "English",
        "duration": 148
      },
      "screenId": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
        "screenName": "Screen 1",
        "totalSeats": 100
      },
      "showDate": "2024-12-30",
      "showTime": "18:00",
      "pricePerSeat": 250,
      "bookedSeats": ["A1", "A2"]
    }
  ]
}
```

---

## 🎟 Booking APIs

### 10. Create Booking (with Transaction)
**POST** `/api/bookings` 🔒

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "showId": "64a1b2c3d4e5f6g7h8i9j0k3",
  "seatNumbers": ["A5", "A6", "A7"],
  "paymentMethod": "UPI"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "booking": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k4",
      "userId": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k0",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210"
      },
      "showId": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
        "movieId": {
          "title": "Inception",
          "language": "English",
          "duration": 148
        },
        "screenId": {
          "screenName": "Screen 1"
        },
        "showDate": "2024-12-30",
        "showTime": "18:00",
        "pricePerSeat": 250
      },
      "bookingDate": "2024-12-26T10:30:00.000Z",
      "totalAmount": 750,
      "status": "CONFIRMED",
      "tickets": [
        {
          "seatNumber": "A5",
          "ticketNumber": "TKT1703587800000ABCD1234"
        },
        {
          "seatNumber": "A6",
          "ticketNumber": "TKT1703587800001EFGH5678"
        },
        {
          "seatNumber": "A7",
          "ticketNumber": "TKT1703587800002IJKL9012"
        }
      ]
    },
    "payment": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k5",
      "bookingId": "64a1b2c3d4e5f6g7h8i9j0k4",
      "paymentMethod": "UPI",
      "paymentStatus": "SUCCESS",
      "amount": 750,
      "paidAt": "2024-12-26T10:30:00.000Z"
    }
  }
}
```

**Error Response (400) - Seats Already Booked:**
```json
{
  "success": false,
  "message": "Seats already booked: A5, A6"
}
```

### 11. Get User Bookings
**GET** `/api/bookings/user/:userId` 🔒

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k4",
      "userId": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "showId": {
        "movieId": {
          "title": "Inception"
        },
        "screenId": {
          "screenName": "Screen 1"
        },
        "showDate": "2024-12-30",
        "showTime": "18:00"
      },
      "bookingDate": "2024-12-26T10:30:00.000Z",
      "totalAmount": 750,
      "status": "CONFIRMED",
      "tickets": [
        {
          "seatNumber": "A5",
          "ticketNumber": "TKT1703587800000ABCD1234"
        }
      ]
    }
  ]
}
```

---

## 💳 Payment APIs

### 12. Get Payment by Booking
**POST** `/api/payments` 🔒

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bookingId": "64a1b2c3d4e5f6g7h8i9j0k4"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k5",
    "bookingId": "64a1b2c3d4e5f6g7h8i9j0k4",
    "paymentMethod": "UPI",
    "paymentStatus": "SUCCESS",
    "amount": 750,
    "paidAt": "2024-12-26T10:30:00.000Z"
  }
}
```

---

## 🎨 Frontend Integration Guide

### Step-by-Step Integration

#### 1. **Setup Base Configuration**

```javascript
// api/config.js
const API_BASE_URL = 'http://localhost:5000/api';

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};
```

#### 2. **Authentication Service**

```javascript
// services/authService.js
import { apiClient } from '../api/config';

export const authService = {
  register: async (userData) => {
    const response = await apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    
    return response;
  },
  
  login: async (credentials) => {
    const response = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    
    return response;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
```

#### 3. **Movie Service**

```javascript
// services/movieService.js
import { apiClient } from '../api/config';

export const movieService = {
  getAllMovies: async () => {
    return await apiClient('/movies');
  },
  
  createMovie: async (movieData) => {
    return await apiClient('/movies', {
      method: 'POST',
      body: JSON.stringify(movieData),
    });
  },
};
```

#### 4. **Show Service**

```javascript
// services/showService.js
import { apiClient } from '../api/config';

export const showService = {
  getShowsByMovie: async (movieId) => {
    return await apiClient(`/shows/${movieId}`);
  },
  
  createShow: async (showData) => {
    return await apiClient('/shows', {
      method: 'POST',
      body: JSON.stringify(showData),
    });
  },
};
```

#### 5. **Booking Service**

```javascript
// services/bookingService.js
import { apiClient } from '../api/config';

export const bookingService = {
  createBooking: async (bookingData) => {
    return await apiClient('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },
  
  getUserBookings: async (userId) => {
    return await apiClient(`/bookings/user/${userId}`);
  },
};
```

#### 6. **Example React Component Usage**

```jsx
// components/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import { showService } from '../services/showService';
import { bookingService } from '../services/bookingService';

const BookingForm = ({ movieId }) => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadShows();
  }, [movieId]);

  const loadShows = async () => {
    try {
      const response = await showService.getShowsByMovie(movieId);
      setShows(response.data);
    } catch (error) {
      console.error('Error loading shows:', error);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const bookingData = {
        showId: selectedShow._id,
        seatNumbers: selectedSeats,
        paymentMethod: 'UPI'
      };
      
      const response = await bookingService.createBooking(bookingData);
      alert('Booking successful!');
      console.log('Booking details:', response.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      {/* Your booking UI here */}
      
        {loading ? 'Processing...' : 'Confirm Booking'}
      
    
  );
};
```

---

## 🔄 Transaction Flow Explanation

### Booking Creation Process

The booking API uses **MongoDB transactions** to ensure data consistency:

```
1. START TRANSACTION
   ↓
2. FIND SHOW BY ID
   ↓
3. CHECK SEAT AVAILABILITY
   ↓ (If seats available)
4. CREATE BOOKING WITH TICKETS
   ↓
5. UPDATE SHOW.BOOKEDSEATS (Atomic)
   ↓
6. CREATE PAYMENT RECORD
   ↓
7. COMMIT TRANSACTION
   ↓
8. RETURN BOOKING + PAYMENT DATA

❌ If any step fails → ROLLBACK TRANSACTION
```

### Key Benefits:
- **Atomic Operations**: All-or-nothing execution
- **Prevents Double Booking**: Seat update is atomic
- **Data Consistency**: Booking and payment created together
- **Error Recovery**: Automatic rollback on failure

---

## ⚠️ Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Server Error:**
```json
{
  "success": false,
  "error": "Server Error"
}
```

---

## 🧪 Testing the APIs

### Using Postman/Thunder Client

1. **Register a user** → Get token
2. **Login** → Get token
3. **Create movie** (with token)
4. **Create screen** (with token)
5. **Create seats** for screen (with token)
6. **Create show** for movie (with token)
7. **Get shows** for movie
8. **Create booking** with seat numbers (with token)
9. **Get user bookings** (with token)

---

## 📝 Notes for Frontend Developers

### Important Points:

1. **Always store JWT token** after login/register
2. **Include token** in Authorization header for protected routes
3. **Check bookedSeats** array in show object to show seat availability
4. **Handle transaction errors** gracefully (seats may be booked between check and booking)
5. **Use ticket numbers** from booking response to display tickets
6. **Calculate total amount** on frontend but verify from backend response
7. **Payment methods** are: `UPI`, `Card`, `Cash`
8. **Booking status** can be: `CONFIRMED`, `CANCELLED`
9. **Date format** for shows: `YYYY-MM-DD`
10. **Time format** for shows: `HH:MM` (24-hour format)

### Security Reminders:

- Never expose JWT_SECRET
- Always validate user input on frontend
- Handle token expiration (7 days default)
- Implement logout to clear tokens
- Use HTTPS in production

---

## 📦 What's Implemented

✅ Complete MVC architecture  
✅ JWT authentication with bcrypt password hashing  
✅ All 7 database models with proper relationships  
✅ Embedded Ticket schema in Booking  
✅ MongoDB transactions for booking atomicity  
✅ Seat double-booking prevention  
✅ All 12 required API endpoints  
✅ Error handling middleware  
✅ Input validation  
✅ ObjectId references and population  
✅ Unique constraints and indexes  
✅ CORS enabled for frontend integration
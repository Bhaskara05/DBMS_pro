import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Movies from './components/Movies';
import Shows from './components/Shows';
import Seats from './components/Seats';
import BookingSummary from './components/BookingSummary';
import Confirmation from './components/Confirmation';
import Profile from './components/Profile';
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  // ADD THIS NEW FUNCTION
const addBooking = (addBooking) => {
  setUserBookings([...userBookings, newBooking]);
  setBooking(addBooking);
};
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Routes>
          <Route 
            path="/" 
            element={currentUser ? <Navigate to="/movies" /> : <Login setCurrentUser={setCurrentUser} />} 
          />
          <Route 
            path="/register" 
            element={<Register />} 
          />
          <Route 
            path="/movies" 
            element={
              currentUser ? 
              <Movies 
                user={currentUser} 
                setCurrentUser={setCurrentUser}
                setSelectedMovie={setSelectedMovie}
              /> : 
              <Navigate to="/" />
            } 
          />
          <Route 
            path="/shows" 
            element={
              currentUser && selectedMovie ? 
              <Shows 
                movie={selectedMovie}
                setSelectedShow={setSelectedShow}
                setSelectedSeats={setSelectedSeats}
              /> : 
              <Navigate to="/movies" />
            } 
          />
          <Route 
            path="/seats" 
            element={
              currentUser && selectedShow ? 
              <Seats 
                show={selectedShow}
                movie={selectedMovie}
                setSelectedSeats={setSelectedSeats}
              /> : 
              <Navigate to="/movies" />
            } 
          />
          <Route 
            path="/summary" 
            element={
              currentUser && selectedShow && selectedSeats.length > 0 ? 
              <BookingSummary 
                movie={selectedMovie}
                show={selectedShow}
                seats={selectedSeats}
                setBooking={setBooking}
                user={currentUser}
              /> : 
              <Navigate to="/movies" />
            } 
          />
          <Route 
            path="/confirmation" 
            element={
              currentUser && booking ? 
              <Confirmation 
                booking={booking}
                movie={selectedMovie}
                show={selectedShow}
                setSelectedMovie={setSelectedMovie}
                setSelectedShow={setSelectedShow}
                setSelectedSeats={setSelectedSeats}
                setBooking={setBooking}
              /> : 
              <Navigate to="/movies" />
            } 
          />
          <Route 
  path="/profile" 
  element={
    currentUser ? 
    <Profile 
      user={currentUser}
      setCurrentUser={setCurrentUser}
      userBookings={userBookings}
    /> : 
    <Navigate to="/" />
  } 
/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
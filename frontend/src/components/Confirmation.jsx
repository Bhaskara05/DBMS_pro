import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

function Confirmation({ 
  booking, 
  movie, 
  show, 
  setSelectedMovie, 
  setSelectedShow, 
  setSelectedSeats, 
  setBooking 
}) {
  const navigate = useNavigate();
  const theatre = mockData.theatres.find(t => t.theatre_id === show.theatre_id);

  const handleNewBooking = () => {
    setSelectedMovie(null);
    setSelectedShow(null);
    setSelectedSeats([]);
    setBooking(null);
    navigate('/movies');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px' 
    }}>
      <div style={{ maxWidth: '650px', width: '100%' }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '50px 40px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          textAlign: 'center' 
        }}>
          {/* Success Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#d1fae5', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '48px'
            }}>
              ✅
            </div>
          </div>
          
          <h2 style={{ color: '#10b981', marginBottom: '12px', fontSize: '28px' }}>
            Booking Confirmed!
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '35px', fontSize: '16px' }}>
            Your tickets have been booked successfully
          </p>

          {/* Booking Details Card */}
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '30px', 
            borderRadius: '10px', 
            marginBottom: '35px', 
            textAlign: 'left', 
            border: '2px dashed #e5e7eb' 
          }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '25px', 
              paddingBottom: '25px', 
              borderBottom: '1px solid #e5e7eb' 
            }}>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '13px', 
                marginBottom: '8px', 
                textTransform: 'uppercase', 
                letterSpacing: '1px' 
              }}>
                Booking ID
              </p>
              <p style={{ 
                color: '#1f2937', 
                fontWeight: '700', 
                fontSize: '24px', 
                margin: 0, 
                fontFamily: 'monospace' 
              }}>
                {booking.booking_id}
              </p>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <p style={{ color: '#374151', fontWeight: '600', fontSize: '18px', marginBottom: '12px' }}>
                {movie.movie_name}
              </p>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '6px' }}>
                {movie.genre} • {movie.language}
              </p>
            </div>

            <div style={{ paddingTop: '18px', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Theatre: </span>
                <span style={{ color: '#374151', fontWeight: '500' }}>
                  {theatre.theatre_name}
                </span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Location: </span>
                <span style={{ color: '#374151' }}>{theatre.location}</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Date & Time: </span>
                <span style={{ color: '#374151', fontWeight: '500' }}>
                  {show.show_date} • {show.show_time}
                </span>
              </div>
              <div style={{ marginBottom: '18px' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Seats: </span>
                <span style={{ color: '#2563eb', fontWeight: '600' }}>
                  {booking.seats.join(', ')}
                </span>
              </div>
              
              <div style={{ 
                backgroundColor: 'white', 
                padding: '15px', 
                borderRadius: '8px', 
                textAlign: 'center' 
              }}>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
                  Amount Paid
                </p>
                <p style={{ color: '#2563eb', fontSize: '28px', fontWeight: '700', margin: 0 }}>
                  ₹{booking.total_amount}
                </p>
              </div>
            </div>
          </div>

          <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '25px' }}>
            📧 A confirmation email has been sent to your registered email address
          </p>

          <button
            onClick={handleNewBooking}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Book More Tickets
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
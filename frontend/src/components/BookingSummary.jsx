import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

function BookingSummary({ movie, show, seats, setBooking, user }) {
  const navigate = useNavigate();
  const theatre = mockData.theatres.find(t => t.theatre_id === show.theatre_id);
  
  const ticketPrice = seats.length * show.price;
  const convenienceFee = seats.length * 20;
  const gst = Math.round((ticketPrice + convenienceFee) * 0.18);
  const grandTotal = ticketPrice + convenienceFee + gst;

  const handleConfirm = () => {
    const newBooking = {
      booking_id: Math.floor(100000 + Math.random() * 900000),
      user_id: user.user_id,
      show_id: show.show_id,
      booking_date: new Date().toISOString().split('T')[0],
      total_amount: grandTotal,
      seats: seats
    };
    
    setBooking(newBooking);
    navigate('/confirmation');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
        <button 
          onClick={() => navigate('/seats')} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'white', 
            color: '#374151', 
            border: '1px solid #e5e7eb', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            marginBottom: '20px',
            fontWeight: '500'
          }}
        >
          ← Back to Seats
        </button>

        <h2 style={{ color: '#1f2937', marginBottom: '25px', fontSize: '24px' }}>
          Booking Summary
        </h2>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '10px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
        }}>
          {/* Movie Details */}
          <div style={{ 
            marginBottom: '25px', 
            paddingBottom: '25px', 
            borderBottom: '2px solid #f3f4f6' 
          }}>
            <h3 style={{ color: '#1f2937', marginBottom: '12px', fontSize: '20px' }}>
              {movie.movie_name}
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '6px' }}>
              {movie.genre} • {movie.language} • {movie.rating}
            </p>
            <p style={{ color: '#6b7280' }}>{movie.duration}</p>
          </div>

          {/* Show Details */}
          <div style={{ 
            marginBottom: '25px', 
            paddingBottom: '25px', 
            borderBottom: '2px solid #f3f4f6' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ color: '#6b7280', fontWeight: '500' }}>Theatre</span>
              <span style={{ color: '#1f2937', fontWeight: '600', textAlign: 'right' }}>
                {theatre.theatre_name}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ color: '#6b7280', fontWeight: '500' }}>Location</span>
              <span style={{ color: '#1f2937', textAlign: 'right' }}>
                {theatre.location}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ color: '#6b7280', fontWeight: '500' }}>Date & Time</span>
              <span style={{ color: '#1f2937', textAlign: 'right' }}>
                {show.show_date} • {show.show_time}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280', fontWeight: '500' }}>Seats</span>
              <span style={{ color: '#2563eb', fontWeight: '600', textAlign: 'right' }}>
                {seats.join(', ')}
              </span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div style={{ 
            marginBottom: '25px', 
            paddingBottom: '25px', 
            borderBottom: '2px solid #f3f4f6' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#6b7280' }}>
                Ticket Price ({seats.length} × ₹{show.price})
              </span>
              <span style={{ color: '#1f2937' }}>₹{ticketPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#6b7280' }}>
                Convenience Fee ({seats.length} × ₹20)
              </span>
              <span style={{ color: '#1f2937' }}>₹{convenienceFee}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>GST (18%)</span>
              <span style={{ color: '#1f2937' }}>₹{gst}</span>
            </div>
          </div>

          {/* Total */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '22px', 
              fontWeight: '700' 
            }}>
              <span style={{ color: '#1f2937' }}>Grand Total</span>
              <span style={{ color: '#2563eb' }}>₹{grandTotal}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '17px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            💳 Confirm & Pay ₹{grandTotal}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
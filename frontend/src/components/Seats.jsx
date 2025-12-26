import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Seats({ show, movie, setSelectedSeats }) {
  const navigate = useNavigate();
  const [localSelectedSeats, setLocalSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings/show/${show._id}`
        );
        const data = await res.json();

        if (res.ok) {
          setBookedSeats(data.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookedSeats();
  }, [show]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setLocalSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const getSeatStatus = (seat) => {
    if (bookedSeats.includes(seat)) return 'booked';
    if (localSelectedSeats.includes(seat)) return 'selected';
    return 'available';
  };

  const handleProceed = () => {
    setSelectedSeats(localSelectedSeats);
    navigate('/summary');
  };

  const theatre = show.screenId.theatreId;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <button 
          onClick={() => navigate('/shows')} 
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
          ← Back to Shows
        </button>

        {/* Movie and Show Info */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '25px', 
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ color: '#1f2937', marginBottom: '12px', fontSize: '22px' }}>
            {movie.movie_name}
          </h2>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexWrap: 'wrap', 
            color: '#6b7280', 
            fontSize: '14px' 
          }}>
            <span><strong>{theatre.theatre_name}</strong>, {theatre.location}</span>
            <span>•</span>
            <span>{show.show_date} at {show.show_time}</span>
          </div>
        </div>

        <h3 style={{ color: '#374151', marginBottom: '20px', fontSize: '20px' }}>
          Select Your Seats
        </h3>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px 30px', 
          borderRadius: '10px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
        }}>
          {/* Screen */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ 
              width: '70%', 
              height: '10px', 
              backgroundColor: '#d1d5db', 
              margin: '0 auto', 
              borderRadius: '50%' 
            }}></div>
            <p style={{ 
              color: '#6b7280', 
              marginTop: '12px', 
              fontSize: '14px', 
              fontWeight: '600', 
              letterSpacing: '2px' 
            }}>
              SCREEN
            </p>
          </div>

          {/* Seat Layout */}
          <div style={{ marginBottom: '40px', overflowX: 'auto' }}>
            {rows.map(row => (
              <div 
                key={row} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  marginBottom: '8px' 
                }}
              >
                <span style={{ 
                  width: '35px', 
                  textAlign: 'center', 
                  color: '#374151', 
                  fontWeight: '700', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '15px' 
                }}>
                  {row}
                </span>

                {[...Array(seatsPerRow)].map((_, i) => {
                  const seatNum = `${row}${i + 1}`;
                  const status = getSeatStatus(seatNum);

                  return (
                    <button
                      key={seatNum}
                      onClick={() => toggleSeat(seatNum)}
                      disabled={status === 'booked'}
                      style={{
                        width: '42px',
                        height: '42px',
                        border: 'none',
                        borderRadius: '6px 6px 0 0',
                        cursor: status === 'booked' ? 'not-allowed' : 'pointer',
                        backgroundColor:
                          status === 'booked' ? '#ef4444' :
                          status === 'selected' ? '#2563eb' : '#10b981',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        opacity: status === 'booked' ? 0.6 : 1
                      }}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '20px', 
            borderRadius: '8px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '6px' }}>
                Selected Seats:{' '}
                {localSelectedSeats.length > 0 ? (
                  <strong style={{ color: '#1f2937' }}>
                    {localSelectedSeats.join(', ')}
                  </strong>
                ) : 'None'}
              </p>
              <p style={{ color: '#1f2937', fontSize: '20px', fontWeight: '700', margin: 0 }}>
                Total: <span style={{ color: '#2563eb' }}>
                  ₹{localSelectedSeats.length * show.price}
                </span>
              </p>
            </div>

            <button
              onClick={handleProceed}
              disabled={localSelectedSeats.length === 0}
              style={{
                padding: '14px 35px',
                backgroundColor: localSelectedSeats.length === 0 ? '#d1d5db' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: localSelectedSeats.length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seats;

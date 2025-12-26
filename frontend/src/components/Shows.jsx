import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Shows({ movie, setSelectedShow, setSelectedSeats }) {
  const navigate = useNavigate();
  const [groupedShows, setGroupedShows] = useState({});

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/shows/${movie._id}`
        );
        const result = await res.json();

        if (!res.ok) return;

        // Group shows by theatre
        const groups = {};
        result.data.forEach(show => {
          const theatre = show.screenId.theatreId;

          if (!groups[theatre._id]) {
            groups[theatre._id] = {
              theatre,
              shows: []
            };
          }

          groups[theatre._id].shows.push(show);
        });

        setGroupedShows(groups);
      } catch (err) {
        console.error(err);
      }
    };

    fetchShows();
  }, [movie]);

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    setSelectedSeats([]);
    navigate('/seats');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <button 
          onClick={() => navigate('/movies')} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'white', 
            color: '#374151', 
            border: '1px solid #e5e7eb', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            marginBottom: '25px',
            fontWeight: '500'
          }}
        >
          ← Back to Movies
        </button>

        {/* Movie Info */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '25px', 
          borderRadius: '10px', 
          marginBottom: '30px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ color: '#1f2937', marginBottom: '10px', fontSize: '26px' }}>
            {movie.movie_name}
          </h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ color: '#6b7280' }}>
              <strong style={{ color: '#374151' }}>Genre:</strong> {movie.genre}
            </span>
            <span style={{ color: '#6b7280' }}>
              <strong style={{ color: '#374151' }}>Language:</strong> {movie.language}
            </span>
            <span style={{ color: '#6b7280' }}>
              <strong style={{ color: '#374151' }}>Duration:</strong> {movie.duration}
            </span>
          </div>
        </div>

        <h3 style={{ color: '#374151', marginBottom: '20px', fontSize: '20px' }}>
          Select Theatre & Show Time
        </h3>

        {/* Theatres & Shows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Object.values(groupedShows).map(({ theatre, shows }) => (
            <div 
              key={theatre._id}
              style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '10px', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)' 
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#1f2937', fontSize: '18px', marginBottom: '6px' }}>
                  📍 {theatre.theatre_name}
                </h4>
                <p style={{ color: '#6b7280', fontSize: '14px', marginLeft: '24px' }}>
                  {theatre.location}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {shows.map(show => (
                  <button
                    key={show._id}
                    onClick={() => handleShowSelect(show)}
                    style={{
                      padding: '15px 20px',
                      backgroundColor: '#f9fafb',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      minWidth: '140px'
                    }}
                  >
                    <div style={{ 
                      fontSize: '15px', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      marginBottom: '8px' 
                    }}>
                      🕐 {show.show_time}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ 
                        color: '#2563eb', 
                        fontWeight: '700', 
                        fontSize: '16px' 
                      }}>
                        ₹{show.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shows;

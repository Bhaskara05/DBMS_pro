import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

function Profile({ user, setCurrentUser, userBookings = [] }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  // Get booking statistics
  const totalBookings = userBookings.length;
  const totalSpent = userBookings.reduce((sum, booking) => sum + booking.total_amount, 0);
  const totalTickets = userBookings.reduce((sum, booking) => sum + booking.seats.length, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => navigate('/movies')}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              ← Back to Movies
            </button>
            <h1 style={{ color: '#2563eb', margin: 0, fontSize: '24px' }}>My Profile</h1>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#ef4444', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '25px' }}>
          
          {/* Left Column - User Info */}
          <div>
            {/* Profile Card */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            }}>
              {/* Profile Picture */}
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#2563eb', 
                borderRadius: '50%', 
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: 'white',
                fontWeight: '700'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>

              <h2 style={{ 
                textAlign: 'center', 
                color: '#1f2937', 
                marginBottom: '25px',
                fontSize: '22px'
              }}>
                {user.name}
              </h2>

              <div style={{ marginBottom: '0' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '15px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '20px' }}>📧</span>
                  <div>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '12px', 
                      marginBottom: '3px' 
                    }}>
                      Email
                    </p>
                    <p style={{ color: '#1f2937', fontSize: '14px', margin: 0 }}>
                      {user.email}
                    </p>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '20px' }}>📱</span>
                  <div>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '12px', 
                      marginBottom: '3px' 
                    }}>
                      Phone
                    </p>
                    <p style={{ color: '#1f2937', fontSize: '14px', margin: 0 }}>
                      {user.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                color: '#1f2937', 
                marginBottom: '20px',
                fontSize: '18px'
              }}>
                📊 Statistics
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>
                    Total Bookings
                  </span>
                  <span style={{ 
                    color: '#2563eb', 
                    fontWeight: '700',
                    fontSize: '16px'
                  }}>
                    {totalBookings}
                  </span>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>
                    Total Tickets
                  </span>
                  <span style={{ 
                    color: '#10b981', 
                    fontWeight: '700',
                    fontSize: '16px'
                  }}>
                    {totalTickets}
                  </span>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '6px'
                }}>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>
                    Total Spent
                  </span>
                  <span style={{ 
                    color: '#d97706', 
                    fontWeight: '700',
                    fontSize: '16px'
                  }}>
                    ₹{totalSpent}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking History */}
          <div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                color: '#1f2937', 
                marginBottom: '25px',
                fontSize: '22px'
              }}>
                🎬 Booking History
              </h2>

              {userBookings.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  color: '#6b7280'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '15px' }}>🎟️</div>
                  <h3 style={{ color: '#374151', marginBottom: '10px' }}>
                    No bookings yet
                  </h3>
                  <p style={{ marginBottom: '20px' }}>
                    Start booking your favorite movies now!
                  </p>
                  <button
                    onClick={() => navigate('/movies')}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: '600'
                    }}
                  >
                    Browse Movies
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {userBookings.map((booking, index) => {
                    const movie = mockData.movies.find(m => m.movie_id === booking.movie_id);
                    const show = mockData.shows.find(s => s.show_id === booking.show_id);
                    const theatre = mockData.theatres.find(t => t.theatre_id === show?.theatre_id);

                    return (
                      <div 
                        key={booking.booking_id || index}
                        style={{
                          border: '2px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '20px',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          marginBottom: '15px'
                        }}>
                          <div>
                            <h3 style={{ 
                              color: '#1f2937', 
                              marginBottom: '8px',
                              fontSize: '18px'
                            }}>
                              {movie?.movie_name || 'Movie'}
                            </h3>
                            <p style={{ 
                              color: '#6b7280', 
                              fontSize: '14px',
                              marginBottom: '4px'
                            }}>
                              {movie?.genre} • {movie?.language}
                            </p>
                          </div>
                          <div style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            height: 'fit-content'
                          }}>
                            CONFIRMED
                          </div>
                        </div>

                        <div style={{ 
                          backgroundColor: '#f9fafb',
                          padding: '15px',
                          borderRadius: '8px',
                          marginBottom: '15px'
                        }}>
                          <div style={{ 
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            fontSize: '14px'
                          }}>
                            <div>
                              <p style={{ color: '#6b7280', marginBottom: '4px' }}>
                                Booking ID
                              </p>
                              <p style={{ 
                                color: '#1f2937', 
                                fontWeight: '600',
                                fontFamily: 'monospace'
                              }}>
                                {booking.booking_id}
                              </p>
                            </div>
                            <div>
                              <p style={{ color: '#6b7280', marginBottom: '4px' }}>
                                Theatre
                              </p>
                              <p style={{ color: '#1f2937', fontWeight: '600' }}>
                                {theatre?.theatre_name}
                              </p>
                            </div>
                            <div>
                              <p style={{ color: '#6b7280', marginBottom: '4px' }}>
                                Show Date & Time
                              </p>
                              <p style={{ color: '#1f2937', fontWeight: '600' }}>
                                {show?.show_date} • {show?.show_time}
                              </p>
                            </div>
                            <div>
                              <p style={{ color: '#6b7280', marginBottom: '4px' }}>
                                Seats
                              </p>
                              <p style={{ color: '#2563eb', fontWeight: '600' }}>
                                {booking.seats.join(', ')}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <span style={{ color: '#6b7280', fontSize: '14px' }}>
                              Total Amount
                            </span>
                            <p style={{ 
                              color: '#2563eb', 
                              fontSize: '22px',
                              fontWeight: '700',
                              margin: '4px 0 0 0'
                            }}>
                              ₹{booking.total_amount}
                            </p>
                          </div>
                          <button
                            style={{
                              padding: '10px 20px',
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '600'
                            }}
                          >
                            📥 Download Ticket
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
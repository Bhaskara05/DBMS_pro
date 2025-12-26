import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

function Movies({ user, setCurrentUser, setSelectedMovie }) {
  const navigate = useNavigate();

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    navigate('/shows');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 10 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div>
            <h1 style={{ color: '#2563eb', margin: 0, fontSize: '28px' }}>🎬 MovieBook</h1>
            <p style={{ color: '#6b7280', margin: '5px 0 0 0', fontSize: '14px' }}>
              Book your favorite movies
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ color: '#374151', fontWeight: '500' }}>
              Welcome, {user.name}
            </span>
            
            {/* Profile Button - ADDED */}
            <button 
              onClick={() => navigate('/profile')}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#10b981', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              👤 My Profile
            </button>
            
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
      </div>

      {/* Movies Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        <h2 style={{ color: '#1f2937', marginBottom: '25px', fontSize: '24px' }}>
          Now Showing
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '25px' 
        }}>
          {mockData.movies.map(movie => (
            <div 
              key={movie.movie_id} 
              onClick={() => handleMovieSelect(movie)}
              className="movie-card"
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                cursor: 'pointer', 
                transition: 'all 0.2s'
              }}
            >
              {/* Movie Poster Placeholder */}
              <div style={{ 
                height: '320px', 
                backgroundColor: '#e5e7eb', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative'
              }}>
                <span style={{ fontSize: '64px' }}>🎬</span>
                <div style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  padding: '4px 10px', 
                  borderRadius: '4px', 
                  fontSize: '12px', 
                  fontWeight: '600' 
                }}>
                  {movie.rating}
                </div>
              </div>
              
              {/* Movie Info */}
              <div style={{ padding: '18px' }}>
                <h3 style={{ 
                  color: '#1f2937', 
                  marginBottom: '10px', 
                  fontSize: '18px', 
                  fontWeight: '600' 
                }}>
                  {movie.movie_name}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '6px' }}>
                  {movie.genre}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: '12px' 
                }}>
                  <span style={{ color: '#6b7280', fontSize: '13px' }}>
                    {movie.language}
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '13px' }}>
                    {movie.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
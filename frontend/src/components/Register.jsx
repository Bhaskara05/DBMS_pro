import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      alert('Registration successful! Please login with your credentials.');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '80px auto', 
      padding: '30px', 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
    }}>
      <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: '30px' }}>
        Create Account
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '14px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '14px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="1234567890"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '14px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '14px'
            }}
            required
          />
        </div>

        {error && <p style={{ color: '#dc2626', fontSize: '14px' }}>{error}</p>}

        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          Register
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
        Already have an account?{' '}
        <span 
          onClick={() => navigate('/')} 
          style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '500' }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;

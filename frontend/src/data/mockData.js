export const mockData = {
  users: [
    { 
      user_id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '1234567890', 
      password: 'password123' 
    },
    { 
      user_id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '0987654321', 
      password: 'password123' 
    }
  ],

  movies: [
    { 
      movie_id: 1, 
      movie_name: 'Avatar: The Way of Water', 
      language: 'English', 
      genre: 'Sci-Fi', 
      duration: '192 min', 
      release_date: '2024-12-16',
      rating: 'PG-13'
    },
    { 
      movie_id: 2, 
      movie_name: 'Pathaan', 
      language: 'Hindi', 
      genre: 'Action', 
      duration: '146 min', 
      release_date: '2024-01-25',
      rating: 'U/A'
    },
    { 
      movie_id: 3, 
      movie_name: 'RRR', 
      language: 'Telugu', 
      genre: 'Action/Drama', 
      duration: '187 min', 
      release_date: '2024-03-25',
      rating: 'U/A'
    },
    { 
      movie_id: 4, 
      movie_name: 'Oppenheimer', 
      language: 'English', 
      genre: 'Biography/Drama', 
      duration: '180 min', 
      release_date: '2024-07-21',
      rating: 'A'
    },
    { 
      movie_id: 5, 
      movie_name: 'Jawan', 
      language: 'Hindi', 
      genre: 'Action/Thriller', 
      duration: '169 min', 
      release_date: '2024-09-07',
      rating: 'U/A'
    },
    { 
      movie_id: 6, 
      movie_name: 'Salaar', 
      language: 'Kannada', 
      genre: 'Action', 
      duration: '175 min', 
      release_date: '2024-12-22',
      rating: 'A'
    }
  ],

  theatres: [
    { theatre_id: 1, theatre_name: 'PVR Cinemas', location: 'Downtown Mall' },
    { theatre_id: 2, theatre_name: 'INOX', location: 'City Center' },
    { theatre_id: 3, theatre_name: 'Cinepolis', location: 'Phoenix Mall' }
  ],

  screens: [
    { screen_id: 1, theatre_id: 1, screen_name: 'Screen 1', total_seats: 60 },
    { screen_id: 2, theatre_id: 2, screen_name: 'Screen 1', total_seats: 60 },
    { screen_id: 3, theatre_id: 3, screen_name: 'Screen 1', total_seats: 60 }
  ],

  shows: [
    { show_id: 1, movie_id: 1, theatre_id: 1, screen_id: 1, show_time: '10:00 AM', show_date: '2024-12-27', price: 250 },
    { show_id: 2, movie_id: 1, theatre_id: 1, screen_id: 1, show_time: '02:30 PM', show_date: '2024-12-27', price: 300 },
    { show_id: 3, movie_id: 1, theatre_id: 2, screen_id: 2, show_time: '06:00 PM', show_date: '2024-12-27', price: 350 },
    { show_id: 4, movie_id: 1, theatre_id: 3, screen_id: 3, show_time: '09:30 PM', show_date: '2024-12-27', price: 380 },
    { show_id: 5, movie_id: 2, theatre_id: 1, screen_id: 1, show_time: '11:00 AM', show_date: '2024-12-27', price: 200 },
    { show_id: 6, movie_id: 2, theatre_id: 2, screen_id: 2, show_time: '03:00 PM', show_date: '2024-12-27', price: 220 },
    { show_id: 7, movie_id: 3, theatre_id: 2, screen_id: 2, show_time: '09:00 PM', show_date: '2024-12-27', price: 280 },
    { show_id: 8, movie_id: 3, theatre_id: 3, screen_id: 3, show_time: '01:00 PM', show_date: '2024-12-27', price: 260 },
    { show_id: 9, movie_id: 4, theatre_id: 1, screen_id: 1, show_time: '04:00 PM', show_date: '2024-12-27', price: 320 },
    { show_id: 10, movie_id: 5, theatre_id: 2, screen_id: 2, show_time: '07:30 PM', show_date: '2024-12-27', price: 290 }
  ],

  // Booked seats for each show (show_id: [seat_numbers])
  bookedSeats: {
    1: ['A1', 'A2', 'B5', 'C3', 'D7'],
    2: ['A3', 'D1', 'D2', 'E4', 'E5'],
    3: ['B1', 'B2', 'B3', 'E5', 'C6'],
    4: ['A4', 'A5', 'C1', 'C2'],
    5: ['D3', 'D4', 'B6', 'B7'],
    6: ['A6', 'B8', 'C9'],
    7: ['E1', 'E2', 'F3'],
    8: ['C5', 'D6', 'D7'],
    9: ['B4', 'B5', 'C4', 'C5'],
    10: ['A7', 'A8', 'F9', 'F10']
  }
};
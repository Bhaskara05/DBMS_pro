🎬 Online Movie Ticket Booking System
Single Theatre • MongoDB • Full Stack Project

A real-world movie ticket booking application designed with a clean MongoDB schema, secure backend, and user-friendly frontend.

🌟 Project Highlights

✅ Real-time seat booking
✅ No double-booking of seats
✅ Clean MongoDB data modeling
✅ RESTful API design
✅ Secure authentication
✅ Scalable architecture

📌 About the Project

The Online Movie Ticket Booking System is a full-stack web application built for a single theatre environment.
It allows users to browse movies, view show timings, select seats, book tickets, and make payments seamlessly.

This project focuses on:

Database design using MongoDB

Efficient seat-booking logic

Clear separation of frontend & backend

Real-world application architecture

🎯 Objectives

Design a scalable NoSQL database schema

Prevent seat duplication using atomic updates

Demonstrate MongoDB concepts like embedding & referencing

Build a production-ready backend

Create a clean and intuitive frontend

🛠️ Tech Stack
🔹 Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt (Password Hashing)

🔹 Frontend

React.js

HTML

CSS

JavaScript

🔹 Tools

MongoDB Atlas / Compass

Postman

Git & GitHub

🧱 System Architecture
┌───────────────┐      API Calls       ┌────────────────┐
│               │  ───────────────▶   │                │
│   Frontend    │                      │    Backend     │
│  (React.js)   │  ◀───────────────   │ (Node + Express)│
│               │                      │                │
└───────────────┘                      └────────────────┘
                                              │
                                              │
                                              ▼
                                     ┌────────────────┐
                                     │                │
                                     │    MongoDB     │
                                     │   (NoSQL DB)   │
                                     │                │
                                     └────────────────┘

🗄️ Database Design (MongoDB)
📁 Collections Used

User

Movie

Screen

Seat

Show

Booking

Payment

🎟️ Ticket is embedded inside the Booking document.

🧩 Entities & Attributes
👤 User

userId

name

email

phone

password (hashed)

createdAt

🎬 Movie

movieId

title

language

genre

duration

releaseDate

🖥️ Screen

screenId

screenName

totalSeats

💺 Seat

seatId

screenId

seatNumber

seatType

⏰ Show

showId

movieId

screenId

showDate

showTime

pricePerSeat

bookedSeats

📖 Booking

bookingId

userId

showId

bookingDate

totalAmount

status

tickets (embedded)

🎟️ Ticket (Embedded)

seatNumber

ticketNumber

💳 Payment

paymentId

bookingId

paymentMethod

paymentStatus

amount

paidAt

🔗 Entity Relationships
User ──▶ Booking ──▶ Payment
           │
           ▼
        Ticket (Embedded)
           │
           ▼
          Show ──▶ Movie
           │
           ▼
         Screen ──▶ Seat


One User → Many Bookings

One Movie → Many Shows

One Screen → Many Seats

One Show → Many Bookings

One Booking → Many Tickets

One Booking → One Payment

🔄 Booking Workflow

1️⃣ User selects a movie & show
2️⃣ Available seats are displayed
3️⃣ User selects seats
4️⃣ Booking is created
5️⃣ Seats are locked using bookedSeats
6️⃣ Tickets are generated
7️⃣ Payment is recorded

✔ MongoDB transactions ensure data consistency

🔐 Security Features

Password hashing using bcrypt

JWT-based authentication

Secure environment variables

Atomic seat booking logic

🚀 Future Enhancements

Online payment gateway integration

Seat category-based pricing

Booking cancellation & refund system

Admin dashboard

QR code-based ticket validation

👨‍💻 Team Members

Bhaskara – Backend Development & Database Design

Sanjeev R B – python backend developer

Khushal L – Frontend Development

Ramachandra – Team Member

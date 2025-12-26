📘 System Design & Architecture
Online Movie Ticket Booking System (MongoDB – Single Theatre)
🧱 Entities and Attributes
1️⃣ User

Stores registered user details.

_id – ObjectId (Primary Key)

name – String

email – String (Unique)

phone – String

password – String (Hashed)

createdAt – Date

2️⃣ Movie

Stores movie information.

_id – ObjectId (Primary Key)

title – String

language – String

genre – Array of String

duration – Number (in minutes)

releaseDate – Date

3️⃣ Screen

Represents screens in the theatre.

_id – ObjectId (Primary Key)

screenName – String

totalSeats – Number

4️⃣ Seat

Represents seat layout for each screen.

_id – ObjectId (Primary Key)

screenId – ObjectId (Reference: Screen)

seatNumber – String

seatType – Normal / Premium

5️⃣ Show

Represents movie show timings.

_id – ObjectId (Primary Key)

movieId – ObjectId (Reference: Movie)

screenId – ObjectId (Reference: Screen)

showDate – String

showTime – String

pricePerSeat – Number

bookedSeats – Array of String

6️⃣ Booking

Stores booking details.

_id – ObjectId (Primary Key)

userId – ObjectId (Reference: User)

showId – ObjectId (Reference: Show)

bookingDate – Date

totalAmount – Number

status – CONFIRMED / CANCELLED

tickets – Array of embedded Ticket objects

7️⃣ Ticket (Embedded Document)

Represents issued tickets.

seatNumber – String

ticketNumber – String

Tickets are embedded inside the Booking document.

8️⃣ Payment

Stores payment transaction details.

_id – ObjectId (Primary Key)

bookingId – ObjectId (Reference: Booking)

paymentMethod – UPI / Card / Cash

paymentStatus – SUCCESS / FAILED

amount – Number

paidAt – Date

🔗 Entity Relationships
From Entity	Relationship	To Entity	Type
User	makes	Booking	One-to-Many
Movie	has	Show	One-to-Many
Screen	contains	Seat	One-to-Many
Screen	hosts	Show	One-to-Many
Show	has	Booking	One-to-Many
Booking	generates	Ticket	One-to-Many (Embedded)
Booking	has	Payment	One-to-One
🏗️ System Architecture Diagram
+----------------+       API Requests       +-------------------+
|                |  <------------------->  |                   |
|   Frontend     |                          |     Backend       |
|  (React.js)    |                          | (Node + Express)  |
|                |                          |                   |
+----------------+                          +-------------------+
                                                     |
                                                     |
                                                     v
                                           +-------------------+
                                           |                   |
                                           |     MongoDB       |
                                           |   (NoSQL DB)      |
                                           |                   |
                                           +-------------------+

🗄️ Database Schema Diagram (Logical View)
User
 |
 | 1
 |_________
           |
           | M
        Booking -------- Payment
           |
           |
           | M
        Ticket (Embedded)
           |
           |
         Show -------- Movie
           |
           |
         Screen
           |
           |
          Seat

🧠 Data Modeling Strategy

Referencing is used for major entities like User, Show, and Booking

Embedding is used for Ticket inside Booking

Seat availability is tracked using bookedSeats inside Show

MongoDB transactions ensure booking and payment consistency

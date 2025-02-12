# Irctc-Assignment
This is a Node.js/Express.js based Railway Management System similar to the IRCTC, which allows users to check train availability, book seats, and view booking details. The system also provides role-based access where admins can add trains and update train seats, and users can check train availability, book seats, and view booking details. The system handles race conditions for simultaneous bookings and uses PostgreSQL as the database. Users can book multiple seats at the same time.

## Features

### Admin Role:

- Add new trains to the system.
- Update train details (total seats).

### User Role:

- Check train availability between source and destination.
- Book seats for a train.
- View booking details.

### Race Condition Handling: 
Prevents double booking of seats when multiple users try to book at the same time.
Prevents Users can book multiple seats at the same time.

### Token-based Authentication:
Users need to log in and get a token to perform any booking or train checking tasks.

### API Key Security:
Admin APIs are protected with an API key to restrict unauthorized access.

### Tech Stack
- Backend: Node.js, Express.js
- Database: Neon PostgresQL
- Authentication: JSON Web Token (JWT) for user authentication, API key for admin access (make by admin himself)

### Table of Contents
- (Installation)
- (Database Structure)
- (API Endpoints)
- (User Endpoints)
- (Admin Endpoints)
- (How to Use)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/krishna7054/irctc-assignment.git
cd irctc-assignment
```
2. Database Structure
#### If you don't have Neon Account: `https://neon.tech/home`
1. Make a Project in NeonDB
2. Copy DataBase_Url and Paste in .env file;
3. Goto Sql Editer and Make this tables in your Neon PostgresQL:

- User Table

```bash
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  emailID VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) CHECK (role IN ('admin', 'user')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
- Train Table

```bash
CREATE TABLE trains (
    id SERIAL PRIMARY KEY,
    train_name VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
- Booking Table

```bash
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    train_id INT REFERENCES trains(id) ON DELETE CASCADE,
    seat_number SERIAL NOT NULL,
    booking_status VARCHAR(50) DEFAULT 'confirmed', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
3. Create a .env file in the root directory and configure your environment variables (example provided below and use .env.exmple for refrence):
```bash
DATABASE_URL='PASTE HERE YOUR DATABASE_URL'
ENDPOINT_ID='ENDPOINT_ID'
JWT_SECRET='your_jwt_secret'
API_KEY='your_api_key'
PORT=3000


```
4. Install dependencies:

```bash
npm install
```
5. Start the server:
```bash
node app.js 
or
nodemon app.js
```

6. The server will start at (http://localhost:3000).

### API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/add 
- PUT /api/update-seats/:id
- GET /api/availability
- POST /api/book
- GET /api/booking-details


#### Admin Endpoints

1. Register Admin
- Endpoint: POST /api/auth/register
- Description: Register a new admin.
- Request Body: username, email, password, role
- Body JSON Content:
```bash
{
  "username":"john",
  "emailId": "john.doe@example.com",
  "password": "password123",
  "role": "admin"
}
```
2. Login Admin
- Endpoint: POST /api/auth/login
- Description: login existing admin.
- Request Body: email, password
- Body JSON Content:
```bash
{
  "emailId": "john.doe@example.com",
  "password": "password123",
}
```
3. Add Trains
- Endpoint: POST /api/add
- Description: Add a new trains to the system.
- Headers: Requires a jwt token (login first and recived token).
        - Authorization: YOUR JWT_TOKEN
- Body JSON Content:
```bash
{
  "train_name": "Rajdhani Express",
  "source": "NewDelhi",
  "destination": "Mumbai",
  "total_seats": 500
}
```

4. Update Train Seat
- Endpoint: PUT /api/update-seats/:id
- Description: Update the seat of an existing train.
- Headers: Requires a jwt token (login first and recived token).
        - Authorization: YOUR JWT_TOKEN
- id = train_ID
- Body JSON Content:
```bash
"total_seats": 600
```

#### User Endpoints

1. Register User
- Endpoint: POST /api/auth/register
- Description: Register a new user.
- Request Body: username, email, password, role
- Body JSON Content:
```bash
{
  "username":"robert",
  "emailId": "robert.doe@example.com",
  "password": "password345",
  "role": "user"
}
```
2. Login User
- Endpoint: POST /api/auth/login
- Description: login existing user .
- Request Body: email, password
- Body JSON Content:
```bash
{
  "emailId": "john.doe@example.com",
  "password": "password123",
}
```
3. Check Train Availability
- Endpoint: GET /api/availability
- Description: Check train availability between a source and destination.
- Query Parameters: source="Delhi", destination="Mumbai"
- Headers: Requires a jwt token (login first and recived token).
        - Authorization: YOUR JWT_TOKEN

4. Book Seats
- Endpoint: POST /api/book
- Description: Book multiple seats on a train.
- Headers: Requires a jwt token (login first and recived token).
        - Authorization: YOUR JWT_TOKEN
- Body JSON Content:
```bash
{
  "trainId": "1",
  "numberOfSeats":3
}
```

5. Get Booking Details
- Endpoint: GET /api/booking-details
- Description: Retrieve all bookings made by the user.
- Headers: Requires a jwt token (login first and recived token).
        - Authorization: YOUR JWT_TOKEN


#### How to Use
- Admin: Use an API key(make by himself and enter to .env file) to manage trains (add/update train details).
- Users:
-Register or login to the system.
-Check for train availability.
-Book seats on a train.
-View booking history.

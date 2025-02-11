import express from 'express'
import dotenv from 'dotenv'; 
import sql from './config/db.js';

dotenv.config();
// Importing route files for handling authentication, train management, and bookings
import userRoutes from './routes/userRoutes.js'
// const authRoutes = require('./routes/auth.js');


(async () => {
  try {
    await sql`SELECT 1`;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process on database failure
  }
})();

// Initializing Express application
const app = express();
// Middleware to parse incoming JSON requests
app.use(express.json());

app.use('/api/auth', userRoutes);     // Routes for authentication (login, registration)

const PORT = process.env.PORT || 3000;

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

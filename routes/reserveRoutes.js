import express from 'express'
import { checkAvailability, bookSeats, getBookingDetails } from '../controllers/reserveController.js'
import userMiddleware from '../middleware/userMiddleware.js'


const router = express.Router();

// Route to check train availability
router.get('/availability', userMiddleware, checkAvailability);

// Route to book seats for a train
router.post('/book', userMiddleware, bookSeats);

// Route to get booking details for a user
router.get('/booking-details', userMiddleware, getBookingDetails);


export default router
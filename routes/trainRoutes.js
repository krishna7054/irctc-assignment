import express from 'express'
import { addTrain, updateTrainSeats } from '../controllers/trainController.js'
import userMiddleware  from '../middleware/userMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js';


const router = express.Router();

// Route to add a train
router.post('/add', userMiddleware, roleMiddleware(['admin']), addTrain);

// Route to update available seats for a specific train
router.put('/update-seats/:id', userMiddleware, roleMiddleware(['admin']), updateTrainSeats);

export default router;

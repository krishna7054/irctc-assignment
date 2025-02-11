import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'

const router = express.Router();

// Route to handle user registration
router.post('/register', registerUser);
 
// Route to handle user login
router.post('/login', loginUser);

export default router
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {newUser, findUserByEmailId} from '../models/userModel.js'
import dotenv from 'dotenv'; 
dotenv.config();

// register a user 
export const registerUser = async (req, res) => {
  const { username, emailId, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await newUser(username, emailId, hashedPassword, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error while register user' });
  }
};

// login a user
export const loginUser = async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const result = await findUserByEmailId(emailId); // This returns an array
    const user = result[0]; // Extract the first user from the result array

    if (!user) return res.status(404).json({ error: 'User are not register' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    req.user = { id: user.id, role: user.role }; 
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error while log in' });
  }
};


import jwt from 'jsonwebtoken'
require('dotenv').config();

// Middleware to verify the JWT token for user authentication
export const authMiddleware = (req, res, next) => {
  // Extract the JWT token from the authorization header
  const token = req.headers['authorization'];
  
  // If no token is provided, return a 403 Forbidden response
  if (!token) return res.status(403).send('Token is required');
  
  try {
    // Verify the token using the secret stored in the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object
    req.user = decoded;
    
    next();
  } catch (error) {
    // If token is invalid or expired, return a 401 Unauthorized response
    res.status(401).send('Invalid token');
  }
};



import dotenv from 'dotenv'; 
dotenv.config();

// Middleware to verify if the request contains a valid admin API key
const adminMiddleware = (req, res, next) => {
  // Extract the API key from the request headers
  const apiKey = req.headers['x-api-key'];
  
  // Check if the provided API key matches the admin API key stored in the environment variables
  if (apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(403).send('Unauthorized access');
  }
};


export default adminMiddleware;

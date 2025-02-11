import { modelbookSeats, modelcheckAvailability, modelgetBookingDetails } from '../models/reserveModel.js'


// Check availability of trains based on source, destination, and date
export const checkAvailability = async (req, res) => {
    const { source, destination } = req.query; 
  try {
    const availableTrains = await modelcheckAvailability(source, destination); // Call the model method
    if(availableTrains.length<1){
      return res.status(404).json({ error: 'Train not found' }); 
    }
    res.status(200).json(availableTrains);
  } catch (error) {
    res.status(500).json({ error: 'Error checking availability' });
  }
};

// Book seats for a train
export const bookSeats = async (req, res) => {
    const { trainId } = req.body;
    const userId = req.user.id; // Get user ID from the token
  try {
    const booking = await modelbookSeats(userId, trainId);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error booking seats' });
  }
};

// Get booking details for a user
export const getBookingDetails = async (req, res) => {
    const userId = req.user.id; 
  try {
    const bookings = await modelgetBookingDetails(userId); 
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error getting booking details' });
  }
};


import sql from '../config/db.js'

// Book seats for a user
export const modelbookSeats = async (userId, trainId) => {
  await sql`UPDATE trains 
      SET total_seats = total_seats - 1
      WHERE id = ${trainId}  AND total_seats > 0`

  return await sql`INSERT INTO bookings (user_id, train_id) VALUES (${userId}, ${trainId}) RETURNING *`;
};

// Check availability based on source, destination, and date
export const modelcheckAvailability = async (source, destination) => {
  return await sql`
    SELECT * FROM trains 
    WHERE source = ${source} 
    AND destination = ${destination} 
    AND total_seats > 0
  `;
};

// Get booking details for a user
export const modelgetBookingDetails = async (userId) => {
  return await sql`
    SELECT b.*, t.train_name, t.source, t.destination, b.seat_number
    FROM bookings b
    JOIN trains t ON b.train_id = t.id
    WHERE b.user_id = ${userId}
  `;
};

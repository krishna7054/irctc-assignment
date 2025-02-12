import sql from '../config/db.js'

// Book seats for a user
export const modelbookSeats = async (userId, trainId, numberOfSeats) => {
  const availableSeats = await sql`
    SELECT total_seats FROM trains WHERE id = ${trainId}
  `;

  if (!availableSeats.length || availableSeats[0].total_seats < numberOfSeats) {
    throw new Error("Not enough seats available");
  }

  // Book multiple seats and assign seat numbers uniquely
  const bookedSeats = [];
  for (let i = 0; i < numberOfSeats; i++) {
    const seatResult = await sql`
      INSERT INTO bookings (user_id, train_id, seat_number)
      VALUES (${userId}, ${trainId}, (
        SELECT COALESCE(MAX(seat_number), 0) + 1 FROM bookings WHERE train_id = ${trainId}
      ))
      RETURNING *;
    `;
    bookedSeats.push(seatResult[0]);
  }
    // Update total_seats in the trains table
    await sql`
    UPDATE trains 
    SET total_seats = total_seats - ${numberOfSeats}
    WHERE id = ${trainId}
  `;

  return bookedSeats; // Return all booked seat details
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

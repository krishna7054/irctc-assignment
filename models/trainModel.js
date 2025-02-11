import sql from '../config/db.js'

// Function to create a new train
export const createTrain = async (train_name, source, destination, total_seats) => {
    return await sql`
    INSERT INTO trains (train_name, source, destination, total_seats)
    VALUES (${train_name}, ${source}, ${destination}, ${total_seats})
    RETURNING *
  `;
};

// Function to update available seats for a train
export const updateSeats = async (trainId, total_seats) => {
  return await sql`
    UPDATE trains 
    SET total_seats = ${total_seats} 
    WHERE id = ${trainId} 
    RETURNING *
  `;
};



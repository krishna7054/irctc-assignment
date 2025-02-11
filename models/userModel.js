import sql from '../config/db.js'

// create new user
export const newUser = async (username, emailId, password, role) => {
  return await sql`INSERT INTO users (username, emailId, password, role) VALUES (${username}, ${emailId}, ${password}, ${role}) RETURNING *`;
};

// login existing user
export const findUserByEmailId = async (emailId) => {
  return await sql`SELECT * FROM users WHERE emailId = ${emailId}`;
};



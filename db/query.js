const pool = require("./pool");


async function createUser(firstName, lastName, email, hashedPassword) {
    const result = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password)
         VALUES ($1, $2, $3, $4)`,
        [firstName, lastName, email, hashedPassword]
    );
    return result;
}

async function getUserByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email] 
      );
  
      return result.rows[0] || null; 
    } catch (err) {
      console.error("Error fetching user by email:", err);
      throw err;
    }
  }
  

module.exports = {
    createUser,
    getUserByEmail
};
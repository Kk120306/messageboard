const pool = require("./pool");


async function createUser(firstName, lastName, email, hashedPassword) {
    const result = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password)
         VALUES ($1, $2, $3, $4)`,
        [firstName, lastName, email, hashedPassword]
    );
    return result;
}

module.exports = {
    createUser,
};
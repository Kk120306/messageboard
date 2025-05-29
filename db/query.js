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

async function modifyMembership(id) {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );

        const user = result.rows[0];

        if (!user) {
            throw new Error(`User with id ${id} not found.`);
        }

        const currentStatus = user.is_member;
        const newStatus = !currentStatus;

        await changeMembership(newStatus, id);
        console.log(`Membership status updated to ${newStatus} for user ${id}`);
    } catch (err) {
        console.error("Something went wrong fetching or updating user", err);
        throw err;
    }
}

async function changeMembership(newStatus, id) {
    try {
        await pool.query(
            'UPDATE users SET is_member = $1 WHERE id = $2',
            [newStatus, id]
        );
    } catch (err) {
        console.error("Failed to update membership status", err);
        throw err;
    }
}

async function getUserById(id) {
    return await pool.query(
        `SELECT * FROM users WHERE id = $1`, 
        [id]
    )
}


module.exports = {
    createUser,
    getUserByEmail,
    modifyMembership,
    getUserById
};
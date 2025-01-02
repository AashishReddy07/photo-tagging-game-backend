const pool = require('../config/db');

// Query to create a new user
const createUser = async (name, email, password) => {
    const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [name, email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Query to get all users
const getAllUsers = async () => {
    const query = 'SELECT * FROM users;';
    const { rows } = await pool.query(query);
    return rows;
};

const validateClick = async (character, x, y) => {
    const query = `
        SELECT * FROM characters
        WHERE name = $1 AND x = $2 AND y = $3;
    `;
    const values = [character, x, y];
    const { rows } = await pool.query(query, values);
    return rows.length > 0;
};

module.exports = {
    createUser,
    getAllUsers,
    validateClick,
};

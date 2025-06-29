const pool = require('../utils/db');
const bcrypt = require('bcryptjs');

const getUserByUsername = async (username) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

const createUser = async (user) => {
    const { username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute('INSERT INTO users (username, password) VALUES (?,?)', [username, hashedPassword]);
    return result.insertId;
};

module.exports = {
    getUserByUsername,
    createUser
};    
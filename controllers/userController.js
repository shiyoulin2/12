const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const user = req.body;
    try {
        // 检查用户名是否已存在
        const existingUser = await userModel.getUserByUsername(user.username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        
        const id = await userModel.createUser(user);
        res.status(201).json({ id, username: user.username });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            'your_secret_key', 
            { expiresIn: '1h' }
        );
        
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login
};    
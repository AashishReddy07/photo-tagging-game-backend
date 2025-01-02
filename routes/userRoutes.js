const express = require('express');
const router = express.Router();
const { createUser, getAllUsers } = require('../models/userModel');

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create a new user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await createUser(name, email, password);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/validate-click', async (req, res) => {
    const { character, x, y } = req.body;
    try {
        const isValid = await validateClick(character, x, y);
        res.json({ isValid });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

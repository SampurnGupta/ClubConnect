const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST Signup Route
router.post('/api/signup', async (req, res) => {
    try {
        console.log(req.body); // Added for debugging
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST Login Route
router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Password comparison simplified
        if (password !== user.password) { // Plain comparison
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // For simplicity, respond with success. In production, use sessions or JWT.
        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});

// GET Routes

// Default Route - Redirect to Login
router.get('/', (req, res) => {
    res.redirect('/login');
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Signup Page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Removed Loading Animation Route

// Index Page
router.get('/index', (req, res) => {
    res.render('index');
});

// Add routes for each new club
router.get('/acm', (req, res) => {
    res.render('acm_merged');
});

router.get('/agraga', (req, res) => {
    res.render('agraga_merged');
});

router.get('/automobile', (req, res) => {
    res.render('automobile_merged');
});

router.get('/adventure', (req, res) => {
    res.render('adventure_merged');
});

router.get('/culinary', (req, res) => {
    res.render('culinary_merged');
});

module.exports = router;
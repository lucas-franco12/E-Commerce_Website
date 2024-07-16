const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route for customer and seller
router.post('/signup/:userType', async (req, res) => {
  console.log('signup route');
  const { userType } = req.params;
  const { username, email, password, firebaseUserId } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User or email already exists.' });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      firebaseUserId,
      userType
    });

    const savedUser = await newUser.save();
    res.status(201).json({ userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login/:userType', async (req, res) => {
  console.log('login route');
  const { userType } = req.params;
  const { username, email, password, firebaseUserId } = req.body;

  if (!username || !email || !password || !firebaseUserId) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    // Find user by email, username, and userType
    const user = await User.findOne({ email, username, userType });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare plaintext password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check Firebase User ID
    if (user.firebaseUserId !== firebaseUserId) {
      return res.status(400).json({ message: 'Invalid Firebase User ID.' });
    }

    // Return user ID
    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

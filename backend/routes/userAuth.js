const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined

// Signup route for customer and seller
router.post('/:userType', async (req, res) => {
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

module.exports = router;

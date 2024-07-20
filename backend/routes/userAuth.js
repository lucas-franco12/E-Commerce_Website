const express = require('express');
const CryptoJS = require('crypto-js');
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

    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

    // Create new user
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
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
  console.log('2');
  try {
    // Find user by email, username, and userType
    console.log(email, username, userType);
    const user = await User.findOne({ email, username, userType });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    console.log('3');
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== password) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }
    console.log('4');
        
    // Check Firebase User ID
    if (user.firebaseUserId !== firebaseUserId) {
      return res.status(400).json({ message: 'Invalid Firebase User ID.' });
    }
    console.log('5');
    // Return user ID
    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

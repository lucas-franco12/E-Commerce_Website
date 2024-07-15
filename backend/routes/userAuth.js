// const router = require('express').Router();
// const User = require('../models/User');
// const CryptoJS = require('crypto-js');
// const jwt = require('jsonwebtoken');

// // Register
// router.post('/register', async (req, res) => {
//     const newUser = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         username: req.body.username,
//         email: req.body.email,
//         DOB: req.body.DOB,
//         password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
//     });

//     try{
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

// // Login
// router.post("/login", async (req, res) => {
//     try{
//         const user = await User.findOne({username: req.body.username});
//         if(!user){
//             return res.status(401).json("Bad credentials");
//         }

//         const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
//         const firstPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//         if(firstPassword!==req.body.password){
//             return res.status(401).json("Bad credentials");
//         }
//         const accessToken = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "20d"});
//         const {password, ...others} = user._doc;
        
//         res.status(200).json({...others, accessToken});
//     }catch(err){
//         res.status(500).json(err);
//     }
     
// });

// module.exports = router;

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

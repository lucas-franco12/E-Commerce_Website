const router = require('express').Router();
const CryptoJS = require('crypto-js');
const CryptoJS = require('crypto-js');
const User = require('../models/User');

// Update user account details
router.put('/:id', async (req, res) => {
    const { password, ...updateFields } = req.body;

    if (password) {
        updateFields.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: updateFields,
        }, { new: true });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        // Find the user to ensure they exist
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found");
        }

        // Delete all products created by the user
        await Product.deleteMany({ createdBy: user._id });

        // Delete the user
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("User and their products have been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All Users
router.get('/', async (req, res) => {
    const query = req.query.new; 
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(10) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get User
router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

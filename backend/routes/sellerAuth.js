const router = require('express').Router();
const Seller = require('../models/Seller');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const newSeller = new Seller({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    try{
        const savedSeller = await newSeller.save();
        res.status(201).json(savedSeller);
    } catch(err){
        res.status(500).json(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try{
        const seller = await Seller.findOne({username: req.body.username});
        if(!seller){
            return res.status(401).json("Bad credentials");
        }

        const hashedPassword = CryptoJS.AES.decrypt(seller.password, process.env.SECRET_KEY);
        const firstPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(firstPassword!==req.body.password){
            return res.status(401).json("Bad credentials");
        }
        const accessToken = jwt.sign({id:seller._id}, process.env.JWT_SECRET_KEY, {expiresIn: "20d"});
        const {password, ...others} = seller._doc;
        
        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }
     
});

module.exports = router;
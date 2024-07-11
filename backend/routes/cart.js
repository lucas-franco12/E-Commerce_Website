const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const Cart = require('../models/Cart');

//Create cart
router.post('/', async (req, res) => {
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch(err){
        res.status(500).json(err);
    }
});

//Update cart
router.post('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedCart);
    } catch(err){
        res.status(500).json(err);
    }
});

//Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("The cart is empty...");
    } catch(err){
        res.status(500).json(err);
    }
});

//Get Cart
router.get('/find/:userID', verifyTokenAndAuthorization, async (req, res) => {
    try{
        const Cart = await Cart.findOne({userID: req.params.userID});
        res.status(200).json(Cart);
    } catch(err){
        res.status(500).json(err);
    }
});

//Get All carts
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try{
        const Carts = await Cart.find();
        res.status(200).json(Carts);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
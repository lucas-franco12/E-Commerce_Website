const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const Order = require('../models/Order');

//Create order
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch(err){
        res.status(500).json(err);
    }
});

//Update order
router.post('/:id', verifyTokenAndAdmin, async (req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedOrder);
    } catch(err){
        res.status(500).json(err);
    }
});

//Delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch(err){
        res.status(500).json(err);
    }
});

//Get user orders
router.get('/find/:userID', verifyTokenAndAuthorization, async (req, res) => {
    try{
        const orders = await Order.find({userID: req.params.userID});
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err);
    }
});

//Get All carts
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
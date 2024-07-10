const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const OrderItem = require('../models/OrderItem');

//Create cart
router.post('/', verifyToken, async (req, res) => {
    const newOrderItem = new OrderItem(req.body);
    try{
        const savedOrderItem = await newOrderItem.save();
        res.status(201).json(savedOrderItem);
    } catch(err){
        res.status(500).json(err);
    }
});

//Update cart
router.post('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try{
        const updatedOrderItem = await OrderItem.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedOrderItem);
    } catch(err){
        res.status(500).json(err);
    }
});

//Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try{
        await orderItem.findByIdAndDelete(req.params.id);
        res.status(200).json("The cart is empty...");
    } catch(err){
        res.status(500).json(err);
    }
});

//Get Cart
router.get('/find/:userID', verifyTokenAndAuthorization, async (req, res) => {
    try{
        const orderItem = await OrderItem.findOne({userID: req.params.userID});
        res.status(200).json(orderItem);
    } catch(err){
        res.status(500).json(err);
    }
});

//Get All carts
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try{
        const orderItems = await OrderItem.find();
        res.status(200).json(orderItems);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
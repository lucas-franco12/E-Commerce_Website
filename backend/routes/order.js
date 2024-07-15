const router = require('express').Router();
const Order = require('../models/Order');

//CHECK IF UPDATE, DELETE, AND GET USERS ORDERS WORK

//Create order
router.post('/', async (req, res) => {
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch(err){
        res.status(500).json(err);
    }
});

//Update order
router.post('/:id', async (req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedOrder);
    } catch(err){
        res.status(500).json(err);
    }
});

//Delete
router.delete('/:id', async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch(err){
        res.status(500).json(err);
    }
});

// Get user orders
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    try {
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //Get All carts (admin function)
// router.get('/', async (req, res) => {
//     try{
//         const orders = await Order.find();
//         res.status(200).json(orders);
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

module.exports = router;
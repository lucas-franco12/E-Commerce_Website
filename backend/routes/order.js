const router = require('express').Router();
const Order = require('../models/Order');

// Get user orders
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    try {
        const orders = await Order.find({ userId })
            .populate('products')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders', err);
        res.status(500).json(err);
    }
});

// Get single order by ID
router.get('/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    const userId = req.query.userId;
    try {
        const order = await Order.findById(orderId)
            .populate('products');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order belongs to the userd
        if (order.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized access to order' });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error('Error fetching order', err);
        res.status(500).json(err);
    }
});

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
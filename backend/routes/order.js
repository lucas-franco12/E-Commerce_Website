const router = require('express').Router();
const Order = require('../models/Order');

// Get user orders
router.get('/', async (req, res) => {
    const { userId, userType } = req.query;

    try {
        let orders;
        if (userType === 'customer') {
            // Fetch orders for the customer
            orders = await Order.find({ userId })
                .populate('products.product')
                .sort({ createdAt: -1 });
        } else if (userType === 'seller') {
            // Fetch orders containing products sold by the seller
            orders = await Order.find({ "products.sellerId": userId })
                .populate('products.product')
                .sort({ createdAt: -1 });
        } else {
            return res.status(400).json({ message: 'Invalid userType provided' });
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders', err);
        res.status(500).json({ message: 'Error fetching orders', error: err });
    }
});

// Get single order by ID
router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { userId, userType } = req.query;

    try {
        const order = await Order.findById(orderId)
            .populate('products.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        console.log('Populated order:', JSON.stringify(order, null, 2));

        // Authorization check
        if (userType === 'customer' && order.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized access to order' });
        }

        if (userType === 'seller') {
            const hasProductForSeller = order.products.some(product => product.sellerId.toString() === userId);
            if (!hasProductForSeller) {
                return res.status(403).json({ message: 'Unauthorized access to order' });
            }
        }

        res.status(200).json(order);
    } catch (err) {
        console.error('Error fetching order', err);
        res.status(500).json({ message: 'Error fetching order', error: err });
    }
});

//Create order

router.post('/', async (req, res) => {
    console.log("Incoming order data:", req.body);
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        console.log("Order saved successfully:", savedOrder);
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).json({ message: 'Error saving order', error: err });
    }
});

// Update order
router.post('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error('Error updating order', err);
        res.status(500).json({ message: 'Error updating order', error: err });
    }
});


//Delete
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order has been deleted..." });
    } catch (err) {
        console.error('Error deleting order', err);
        res.status(500).json({ message: 'Error deleting order', error: err });
    }
});

router.get('/seller/:sellerId', async (req, res) => {
    const { sellerId } = req.params;

    try {
        const orders = await Order.find({ "products.sellerId": sellerId })
            .populate('products.product')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders for seller', err);
        res.status(500).json({ message: 'Error fetching orders for seller', error: err });
    }
});

module.exports = router;
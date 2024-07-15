const router = require('express').Router();
const Product = require('../models/Product');

// Get products by seller ID (for sellers)
router.get('/', async (req, res) => {
    const { sellerId } = req.query;
    try {
        let products;
        if (sellerId) {
            products = await Product.find({ createdBy: sellerId });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create product (for sellers)
router.post('/', async (req, res) => {
    const { sellerId, ...productData } = req.body;
    const newProduct = new Product({ ...productData, createdBy: sellerId });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//Update product (as seller) id is product id
router.put('/:id', async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedProduct);
    } catch(err){
        res.status(500).json(err);
    }
});

//Delete (as seller)
router.delete('/:id', async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch(err){
        res.status(500).json(err);
    }
});

//Get Product
router.get('/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
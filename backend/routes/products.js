const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err });
    }
});

// Get products for a specific seller
router.get('/seller', async (req, res) => {
    const sellerId = req.query.sellerId;
    if (!sellerId) {
        return res.status(400).json({ message: 'Seller ID is required' });
    }

    try {
        const products = await Product.find({ sellerId });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this seller' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    const { name, desc, price, src, userId } = req.body;

    try {
        const newProduct = new Product({ name, desc, price, src, createdBy: userId });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Error adding product', error: err });
    }
});



// Update an existing product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product has been deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err });
    }
});

module.exports = router;

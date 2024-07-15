const router = require('express').Router();
const Product = require('../models/Product');

// Get All products
router.get('/', async (req, res) => {
    const qNew = req.query.new; 
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
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
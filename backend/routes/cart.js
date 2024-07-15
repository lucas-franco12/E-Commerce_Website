<<<<<<< Updated upstream
const router = require('express').Router();
=======
// const router = require('express').Router();
// const Cart = require('../models/Cart');

// //Create cart
// router.post('/', async (req, res) => {
//     const newCart = new Cart(req.body);
//     try{
//         const savedCart = await newCart.save();
//         res.status(201).json(savedCart);
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

// //Update cart
// router.post('/:id', async (req, res) => {
//     try{
//         const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
//         res.status(200).json(updatedCart);
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

// //Delete
// router.delete('/:id', async (req, res) => {
//     try{
//         await Cart.findByIdAndDelete(req.params.id);
//         res.status(200).json("The cart is empty...");
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

// //Get Cart
// router.get('/find/:userID', async (req, res) => {
//     try{
//         const Cart = await Cart.findOne({userID: req.params.userID});
//         res.status(200).json(Cart);
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

// //Get All carts
// router.get('/', verifyTokenAndAdmin, async (req, res) => {
//     try{
//         const Carts = await Cart.find();
//         res.status(200).json(Carts);
//     } catch(err){
//         res.status(500).json(err);
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
>>>>>>> Stashed changes
const Cart = require('../models/Cart');
const Product = require('../models/Product');

<<<<<<< Updated upstream
//Get Cart
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        // return the products in the cart
        res.json(cart.products);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
});

// Add or update cart
router.post('/', async (req, res) => {
    try {
        const { userId, products } = req.body;
        let cart = await Cart.findOne({ userId });
    
        if (!cart) {
          cart = new Cart({ userId, products });
        } else {
          products.forEach(newProduct => {
            const existingProductIndex = cart.products.findIndex(p => p.SKU === newProduct.SKU);
            if (existingProductIndex > -1) {
              cart.products[existingProductIndex].quantity += newProduct.quantity;
            } else {
              cart.products.push(newProduct);
            }
          });
        }
    
        await cart.save();
        res.json(cart.products);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
});

// Remove a product from the cart by SKU
router.delete('/:productId', async (req, res) => {
    try {
      const { userId } = req.query;
      const { productId } = req.params;
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      cart.products = cart.products.filter(product => product.SKU !== productId);
  
      await cart.save();
      res.json(cart.products);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Clear the cart
router.post('/clear', async (req, res) => {
    try {
      const { userId } = req.query;
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      cart.products = [];
      await cart.save();
      res.json(cart.products);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//Get All carts (admin only - not implemented in frontend)
router.get('/', async (req, res) => {
    try{
        const Carts = await Cart.find();
        res.status(200).json(Carts);
    } catch(err){
        res.status(500).json(err);
=======
// Get cart items for a specific user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const cart = await Cart.findOne({ userId }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart.products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
});

// Add an item to the cart
router.post('/', async (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingProductIndex = cart.products.findIndex(item => item.product.equals(productId));
        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        res.status(200).json(cart.products);
    } catch (err) {
        res.status(500).json({ message: 'Error adding to cart', error: err.message });
    }
});

// Remove an item from the cart
router.delete('/:productId', async (req, res) => {
    const userId = req.query.userId;
    const { productId } = req.params;
    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(item => !item.product.equals(productId));
        await cart.save();
        res.status(200).json(cart.products);
    } catch (err) {
        res.status(500).json({ message: 'Error removing cart item', error: err.message });
    }
});

// Clear the cart
router.post('/clear', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = [];
        await cart.save();
        res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ message: 'Error clearing cart', error: err.message });
>>>>>>> Stashed changes
    }
});

module.exports = router;
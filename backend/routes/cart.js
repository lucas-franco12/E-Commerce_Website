const router = require('express').Router();
const Cart = require('../models/Cart');

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
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart items for a specific user
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  console.log("GET /cart userId:", userId);
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log("GET /cart success: Cart found for userId:", userId, "Cart products:", cart.products);
    res.status(200).json(cart.products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
});

// Add an item to the cart
router.post('/', async (req, res) => {
  const { userId, productId } = req.body;
  console.log("POST /cart body:", req.body);

  if (!userId || !productId) {
    console.log("Bad Request: Missing userId or productId");
    return res.status(400).json({ message: 'User ID and Product ID are required' });
  }

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
      console.log("POST /cart: New cart created for userId:", userId);
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.log("POST /cart error: Product not found for productId:", productId);
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingItemIndex = cart.products.findIndex(item => item.product.equals(productId));
    if (existingItemIndex === -1) {
      cart.products.push({ product: productId });
      console.log("POST /cart: Added new product to cart:", productId);
    } else {
      console.log("POST /cart: Product already in cart:", productId);
    }

    await cart.save();
    console.log("POST /cart success: Cart updated for userId:", userId, "Cart products:", cart.products);
    res.status(200).json(cart.products);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
});

// Remove an item from the cart
router.delete('/:productId', async (req, res) => {
  const userId = req.query.userId;
  const { productId } = req.params;
  console.log("DELETE /cart productId:", productId, "userId:", userId);

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
    console.log("DELETE /cart success: Removed product from cart for userId:", userId, "Remaining products:", cart.products);
    res.status(200).json(cart.products);
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: 'Error removing cart item', error: err.message });
  }
});

// Clear the cart
router.post('/clear', async (req, res) => {
  const userId = req.query.userId;
  console.log("POST /cart/clear userId:", userId);

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
    console.log("POST /cart/clear success: Cart cleared for userId:", userId);
    res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: 'Error clearing cart', error: err.message });
  }
});

module.exports = router;

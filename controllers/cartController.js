const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create or get cart
const getOrCreateCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }
    
    // Check if item already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity
      });
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update cart item
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
    
    let targetUserId = req.user._id;
    if (req.user.role === 'admin' && userId) {
      targetUserId = userId;
    }
    
    const cart = await Cart.findOne({ user: targetUserId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Check if item exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Update quantity
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(existingItemIndex, 1);
    } else {
      cart.items[existingItemIndex].quantity = quantity;
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    
    let targetUserId = req.user._id;
    if (req.user.role === 'admin' && userId) {
      targetUserId = userId;
    }
    
    const cart = await Cart.findOne({ user: targetUserId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Remove item from cart
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getOrCreateCart,
  addToCart,
  updateCartItem,
  removeFromCart
};

const Seller = require('../models/Seller');
const Product = require('../models/Product');

// Create product
const createProduct = async (req, res) => {
  try {
    // Get seller profile
    const seller = await Seller.findOne({ user: req.user._id });
    
    if (!seller) {
      return res.status(401).json({ message: 'Not authorized as a seller' });
    }

    const { name, description, price, photo, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      photo,
      category,
      seller: seller._id
    });

    // Add product to seller's products array
    seller.products.push(product._id);
    await seller.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get seller products
const getSellerProducts = async (req, res) => {
  try {
    // Get seller profile
    const seller = await Seller.findOne({ user: req.user._id });
    
    if (!seller) {
      return res.status(401).json({ message: 'Not authorized as a seller' });
    }

    const products = await Product.find({ seller: seller._id });
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    // Get seller profile
    const seller = await Seller.findOne({ user: req.user._id });
    
    if (!seller) {
      return res.status(401).json({ message: 'Not authorized as a seller' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product belongs to seller
    if (product.seller.toString() !== seller._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, description, price, photo, category } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.photo = photo || product.photo;
    product.category = category || product.category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    // Get seller profile
    const seller = await Seller.findOne({ user: req.user._id });
    
    if (!seller) {
      return res.status(401).json({ message: 'Not authorized as a seller' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product belongs to seller
    if (product.seller.toString() !== seller._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await product.deleteOne();

    // Remove product from seller's products array
    seller.products = seller.products.filter(
      productId => productId.toString() !== req.params.id
    );
    await seller.save();

    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getSellerProducts,
  updateProduct,
  deleteProduct
};
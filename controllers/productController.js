const Product = require('../models/Product');
const Seller = require('../models/Seller');

// Get all products (public, no search)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('seller', 'storeName');
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get products by search (protected)
const getProductsBySearch = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    // Search by product name or seller name
    const sellers = await Seller.find({
      storeName: { $regex: query, $options: 'i' }
    });

    const sellerIds = sellers.map(seller => seller._id);

    const filter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { seller: { $in: sellerIds } }
      ]
    };

    const products = await Product.find(filter).populate('seller', 'storeName');
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'storeName');
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsBySearch
};

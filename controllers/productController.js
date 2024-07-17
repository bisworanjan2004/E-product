
const Product = require("../model/productModel");


exports.createProduct = async (req, res) => {
  try {
    const { title, price, category, details, quantity, imageUrl } = req.body;

    const newProduct = new Product({
      title,
      price,
      category,
      details,
      quantity,
      imageUrl,
      userId: req.user.id,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;            
    const product = await Product.findOne({
      _id: productId,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { price, details, title, quantity, imageUrl, category } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: productId, userId: req.user.id },
      { price, details, title, quantity, imageUrl, category },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOneAndDelete({
      _id: productId,
      userId: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const products = await Product.find({ userId }); 

    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
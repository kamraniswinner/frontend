import Product from '../models/Product.js';
import fs from 'fs';

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createProduct(req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { productNumber, name, description, price, gender, category, stock } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    const newProduct = new Product({
      productNumber,
      name,
      description,
      price,
      images,
      gender,
      category,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { productNumber, name, description, price, gender, category, stock } = req.body;
    const images = req.file ? req.file.path : '';

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productNumber,
        name,
        description,
        price,
        images,
        gender,
        category,
        stock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

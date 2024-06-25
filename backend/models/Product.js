import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'inventory', // Reference to the Product model
  },
  productNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  gender: {
    type: String,
    enum: ['select', 'men', 'women'],
    default: 'select',
    required: true,
  },
  category: {
    type: String,
    enum: ['select', 'ring', 'earring', 'pendant', 'bracelet', 'bangles', 'amulet', 'anklet', 'nose-piercing', 'tika-set', 'accessories', 'parfum'],
    default: 'select',
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;

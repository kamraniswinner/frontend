import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const itemIndex = cart.cartItems.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      let productItem = cart.cartItems[itemIndex];
      productItem.quantity += quantity;
      cart.cartItems[itemIndex] = productItem;
    } else {
      cart.cartItems.push({ product: productId, quantity, price: product.price });
    }
    cart.calculateTotalPrice();
    await cart.save();
  } else {
    const newCart = new Cart({
      user: req.user._id,
      cartItems: [{ product: productId, quantity, price: product.price }],
      totalPrice: product.price * quantity,
    });
    newCart.calculateTotalPrice();
    await newCart.save();
  }

  res.status(201).json({ message: 'Item added to cart' });
});

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product', 'name price');

  if (cart) {
    res.json(cart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const itemIndex = cart.cartItems.findIndex((item) => item.product.toString() === productId);
    
    if (itemIndex > -1) {
      cart.cartItems.splice(itemIndex, 1);
      cart.calculateTotalPrice();
      await cart.save();
      res.status(200).json({ message: 'Item removed from cart' });
    } else {
      res.status(404);
      throw new Error('Item not found in cart');
    }
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

export { addToCart, getCart, removeFromCart };

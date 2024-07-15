import express from 'express';
const router = express.Router();
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addToCart).get(protect, getCart);
router.route('/:productId').delete(protect, removeFromCart);

export default router;

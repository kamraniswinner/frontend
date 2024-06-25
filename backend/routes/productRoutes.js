import express from 'express';
import upload from '../middleware/upload.js';
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/',  upload.array('images', 10) ,createProduct);
router.put('/:id', upload.array('images', 10), updateProduct);
router.delete('/:id', deleteProduct);

export default router;

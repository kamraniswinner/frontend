import express from 'express';
import { getFavourites, addFavourite, removeFavourite } from '../controllers/favouriteController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming you have authentication middleware

const router = express.Router();

router.route('/')
  .get(protect, getFavourites)
  .post(protect, addFavourite)
  .delete(protect, removeFavourite);

export default router;

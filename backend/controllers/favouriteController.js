import Favourite from '../models/Favourite.js';

// Get all favourite products for a user
export const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.findOne({ user: req.user._id }).populate('products');
    if (!favourites) {
      return res.status(404).json({ message: 'No favourites found' });
    }
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a product to favourites
export const addFavourite = async (req, res) => {
  const { productId } = req.body;
  try {
    let favourites = await Favourite.findOne({ user: req.user._id });
    if (!favourites) {
      favourites = new Favourite({ user: req.user._id, products: [productId] });
    } else {
      favourites.products.push(productId);
    }
    await favourites.save();
    res.status(201).json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a product from favourites
export const removeFavourite = async (req, res) => {
  const { productId } = req.body;
  try {
    const favourites = await Favourite.findOne({ user: req.user._id });
    if (!favourites) {
      return res.status(404).json({ message: 'No favourites found' });
    }
    favourites.products = favourites.products.filter(id => id.toString() !== productId);
    await favourites.save();
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

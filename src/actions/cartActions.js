import axios from 'axios';

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    // Fetch product details using productId
    const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
    const product = response.data; // Assuming the API returns the product details

    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  } catch (error) {
    console.error('Error fetching product details:', error);
    // Handle error here
  }
};

export const removeFromCart = (productId) => (dispatch) => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: 'CLEAR_CART' });
};

import axios from 'axios';

// Action creator to add shipping information
export const addShippingInfo = (shippingInfo) => {
  return async (dispatch) => {
    try {
      // Send a POST request to the backend shipping API
      const response = await axios.post('http://localhost:5000/api/shipping', shippingInfo);
      
      // Dispatch an action with the shipping information received from the server
      dispatch({ type: 'ADD_SHIPPING_INFO', payload: response.data });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error adding shipping information:', error);
      // You can dispatch an error action if needed
    }
  };
};

// Action creator to clear shipping information
export const clearShippingInfo = () => {
  return {
    type: 'CLEAR_SHIPPING_INFO',
  };
};

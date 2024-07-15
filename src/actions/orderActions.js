import axios from 'axios';

export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: 'ORDER_CREATE_REQUEST' });

  try {
    const response = await axios.post('http://localhost:5000/api/orders', orderData);
    const order = response.data;
    dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: order });
  } catch (error) {
    dispatch({ type: 'ORDER_CREATE_FAILURE', payload: error.message });
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  dispatch({ type: 'ORDER_DETAILS_REQUEST' });

  try {
    const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
    const order = response.data;
    dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: order });
  } catch (error) {
    dispatch({ type: 'ORDER_DETAILS_FAILURE', payload: error.message });
  }
};

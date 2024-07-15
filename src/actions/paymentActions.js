import axios from 'axios';

// Action creator to initiate payment
export const initiatePayment = (paymentData) => {
  return async (dispatch) => {
    dispatch({ type: PAYMENT_REQUEST });
    try {
      // Make an API call to initiate payment
      const response = await axios.post('/api/payment', paymentData);
      dispatch({ type: PAYMENT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: PAYMENT_FAILURE, payload: error.message });
    }
  };
};

// Action creator to clear payment status
export const clearPaymentStatus = () => {
  return {
    type: CLEAR_PAYMENT_STATUS,
  };
};

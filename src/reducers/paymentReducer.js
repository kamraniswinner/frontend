// Define initial state for payment
const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  // Reducer function for payment
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case PAYMENT_REQUEST:
        return { ...state, loading: true, success: false, error: null };
      case PAYMENT_SUCCESS:
        return { ...state, loading: false, success: true };
      case PAYMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case CLEAR_PAYMENT_STATUS:
        return { ...state, success: false, error: null };
      default:
        return state;
    }
  };
  
  export default paymentReducer;
  
const initialState = {
    shippingInfo: null,
  };
  
  const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_SHIPPING_INFO':
        return {
          ...state,
          shippingInfo: action.payload,
        };
      case 'CLEAR_SHIPPING_INFO':
        return {
          ...state,
          shippingInfo: null,
        };
      default:
        return state;
    }
  };
  
  export default shippingReducer;
  
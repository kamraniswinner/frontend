const initialState = {
    order: null,
    loading: false,
    error: null,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ORDER_CREATE_REQUEST':
      case 'ORDER_DETAILS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'ORDER_CREATE_SUCCESS':
      case 'ORDER_DETAILS_SUCCESS':
        return { ...state, loading: false, order: action.payload };
      case 'ORDER_CREATE_FAILURE':
      case 'ORDER_DETAILS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  
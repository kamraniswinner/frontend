const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PRODUCTS_REQUEST':
      case 'PRODUCT_DETAILS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'PRODUCTS_SUCCESS':
        return { ...state, loading: false, products: action.payload };
      case 'PRODUCT_DETAILS_SUCCESS':
        return { ...state, loading: false, product: action.payload };
      case 'PRODUCTS_FAILURE':
      case 'PRODUCT_DETAILS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default productReducer;
  
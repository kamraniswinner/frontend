const initialState = {
    items: [], // Array of objects: { product: productObject, quantity: quantityNumber }
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const { product, quantity } = action.payload;
        const existingItemIndex = state.items.findIndex((item) => item.product._id === product._id);
        if (existingItemIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += quantity;
          return { ...state, items: updatedItems };
        } else {
          return { ...state, items: [...state.items, { product, quantity }] };
        }
      case 'REMOVE_FROM_CART':
        const updatedItems = state.items.filter((item) => item.product._id !== action.payload);
        return { ...state, items: updatedItems };
      case 'CLEAR_CART':
        return { ...state, items: [] };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  
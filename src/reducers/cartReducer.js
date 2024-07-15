const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
const REMOVE_FROM_CART_REQUEST = 'REMOVE_FROM_CART_REQUEST';
const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
const REMOVE_FROM_CART_FAILURE = 'REMOVE_FROM_CART_FAILURE';
const CLEAR_CART_REQUEST = 'CLEAR_CART_REQUEST';
const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
const CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE';
const CALCULATE_CART_TOTAL_REQUEST = 'CALCULATE_CART_TOTAL_REQUEST';
const CALCULATE_CART_TOTAL_SUCCESS = 'CALCULATE_CART_TOTAL_SUCCESS';
const CALCULATE_CART_TOTAL_FAILURE = 'CALCULATE_CART_TOTAL_FAILURE';
const GET_CART_REQUEST = 'GET_CART_REQUEST';
const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
const GET_CART_FAILURE = 'GET_CART_FAILURE';

const initialState = {
  loading: false,
  cartitems: [],
  error: null,
  totalPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  cartAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case REMOVE_FROM_CART_REQUEST:
    case CLEAR_CART_REQUEST:
    case CALCULATE_CART_TOTAL_REQUEST:
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_TO_CART_SUCCESS:
    case REMOVE_FROM_CART_SUCCESS:
    case CLEAR_CART_SUCCESS:
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartitems: action.payload.cartItems,
      };

    case CALCULATE_CART_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        totalPrice: action.payload.totalPrice,
        taxPrice: action.payload.taxPrice,
        shippingPrice: action.payload.shippingPrice,
        cartAmount: action.payload.cartAmount,
      };

    case ADD_TO_CART_FAILURE:
    case REMOVE_FROM_CART_FAILURE:
    case CLEAR_CART_FAILURE:
    case CALCULATE_CART_TOTAL_FAILURE:
    case GET_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;

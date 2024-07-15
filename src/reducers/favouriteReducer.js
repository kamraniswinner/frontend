// actionTypes.js
export const ADD_FAVOURITE_PRODUCT_REQUEST = 'ADD_FAVOURITE_PRODUCT_REQUEST';
export const ADD_FAVOURITE_PRODUCT_SUCCESS = 'ADD_FAVOURITE_PRODUCT_SUCCESS';
export const ADD_FAVOURITE_PRODUCT_FAILURE = 'ADD_FAVOURITE_PRODUCT_FAILURE';

export const REMOVE_FAVOURITE_PRODUCT_REQUEST = 'REMOVE_FAVOURITE_PRODUCT_REQUEST';
export const REMOVE_FAVOURITE_PRODUCT_SUCCESS = 'REMOVE_FAVOURITE_PRODUCT_SUCCESS';
export const REMOVE_FAVOURITE_PRODUCT_FAILURE = 'REMOVE_FAVOURITE_PRODUCT_FAILURE';

export const UPDATE_FAVOURITE_PRODUCT_REQUEST = 'UPDATE_FAVOURITE_PRODUCT_REQUEST';
export const UPDATE_FAVOURITE_PRODUCT_SUCCESS = 'UPDATE_FAVOURITE_PRODUCT_SUCCESS';
export const UPDATE_FAVOURITE_PRODUCT_FAILURE = 'UPDATE_FAVOURITE_PRODUCT_FAILURE';

const initialState = {
    favourites: [],
    loading: false,
    error: null,
  };
  
  const favouriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_FAVOURITE_PRODUCT_REQUEST:
      case REMOVE_FAVOURITE_PRODUCT_REQUEST:
      case UPDATE_FAVOURITE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ADD_FAVOURITE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          favourites: [...state.favourites, action.payload],
        };
      case REMOVE_FAVOURITE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          favourites: state.favourites.filter(product => product.id !== action.payload),
        };
      case UPDATE_FAVOURITE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          favourites: state.favourites.map(product =>
            product.id === action.payload.id ? { ...product, ...action.payload } : product
          ),
        };
      case ADD_FAVOURITE_PRODUCT_FAILURE:
      case REMOVE_FAVOURITE_PRODUCT_FAILURE:
      case UPDATE_FAVOURITE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default favouriteReducer;
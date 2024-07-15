const initialState = {
    reviews: [],
    loading: false,
    error: null,
  };
  
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_REVIEWS_REQUEST':
      case 'ADD_REVIEW_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_REVIEWS_SUCCESS':
        return { ...state, loading: false, reviews: action.payload, error: null };
      case 'ADD_REVIEW_SUCCESS':
        return { ...state, loading: false, reviews: [...state.reviews, action.payload], error: null };
      case 'FETCH_REVIEWS_FAILURE':
      case 'ADD_REVIEW_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default reviewReducer;
  
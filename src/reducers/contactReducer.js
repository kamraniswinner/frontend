const initialState = {
    success: false,
    loading: false,
    error: null,
  };
  
  const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SUBMIT_CONTACT_FORM_REQUEST':
        return { ...state, loading: true, error: null };
      case 'SUBMIT_CONTACT_FORM_SUCCESS':
        return { ...state, loading: false, success: true, error: null };
      case 'SUBMIT_CONTACT_FORM_FAILURE':
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default contactReducer;
  
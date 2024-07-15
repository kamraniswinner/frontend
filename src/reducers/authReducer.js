// src/reducers/authReducer.js
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  signupSuccess: false,
  resetPasswordLinkSuccess: false,
  passwordResetSuccess:false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };

    case 'SIGNUP_REQUEST':
      return { ...state, loading: true, error: null, signupSuccess: false };
    case 'SIGNUP_SUCCESS':
      return { ...state, loading: false, signupSuccess: true };
    case 'SIGNUP_FAILURE':
      return { ...state, loading: false, error: action.payload, signupSuccess: false };

    case 'PASSWORD_RESET_LINK_REQUEST':
      return { ...state, loading: true, error: null, resetPasswordLinkSuccess: false };
    case 'PASSWORD_RESET_LINK_SUCCESS':
      return { ...state, loading: false, resetPasswordlinkSuccess: true };
    case 'PASSWORD_RESET_LINK_FAILURE':
      return { ...state, loading: false, error: action.payload, resetPasswordLinkSuccess: false };

    case 'PASSWORD_RESET_REQUEST':
      return { ...state, loading: true, error: null, passwordResetSuccess: false };
    case 'PASSWORD_RESET_SUCCESS':
      return { ...state, loading: false, passwordResetSuccess: true };
    case 'PASSWORD_RESET_FAILURE':
      return { ...state, loading: false, error: action.payload, passwordResetSuccess: false };

    default:
      return state;
  }
};

export default authReducer;

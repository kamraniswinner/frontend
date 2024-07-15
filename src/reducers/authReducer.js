// src/reducers/authReducer.js
const initialState = {
  isAuthenticated: false,
  user: null,
  users: [],
  loading: false,
  error: null,
  signupSuccess: false,
  resetPasswordLinkSuccess: false,
  passwordResetSuccess: false,
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
      return { ...state, loading: false, resetPasswordLinkSuccess: true };
    case 'PASSWORD_RESET_LINK_FAILURE':
      return { ...state, loading: false, error: action.payload, resetPasswordLinkSuccess: false };

    case 'PASSWORD_RESET_REQUEST':
      return { ...state, loading: true, error: null, passwordResetSuccess: false };
    case 'PASSWORD_RESET_SUCCESS':
      return { ...state, loading: false, passwordResetSuccess: true };
    case 'PASSWORD_RESET_FAILURE':
      return { ...state, loading: false, error: action.payload, passwordResetSuccess: false };

    case 'GET_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'GET_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'GET_ALL_USERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_ALL_USERS_SUCCESS':
      return { ...state, loading: false, users: action.payload };
    case 'GET_ALL_USERS_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;

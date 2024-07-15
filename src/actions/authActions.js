// src/actions/authActions.js
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    // Simulate API call
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const user = response.data;
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

export const logout = () => {
  return { type: 'LOGOUT' };
};

export const signup = (username, email, password) => async (dispatch) => {
  dispatch({ type: 'SIGNUP_REQUEST' });

  try {
    // Simulate API call
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username,
      email,
      password,
    });
    const user = response.data; // Assuming the API returns the user data
    dispatch({ type: 'SIGNUP_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAILURE', payload: error.message });
  }
};

export const requestResetPassword = (email) => async (dispatch) => {
  dispatch({ type: 'PASSWORD_RESET_LINK_REQUEST' });

  try {
    await axios.post('http://localhost:5000/api/auth/resetPassword/request', { email });
    dispatch({ type: 'PASSWORD_RESET_LINK_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'PASSWORD_RESET_LINK_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const confirmResetPassword = (token, newPassword) => async (dispatch) => {
  dispatch({ type: 'PASSWORD_RESET_REQUEST' });

  try {
    await axios.post('http://localhost:5000/api/auth/resetPassword/confirm', { token, newPassword });
    dispatch({ type: 'PASSWORD_RESET_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'PASSWORD_RESET_FAILURE', payload: error.response?.data?.message || error.message });
  }
};
  
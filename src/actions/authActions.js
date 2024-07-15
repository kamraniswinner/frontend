// src/actions/authActions.js
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    // Simulate API call
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const user = response.data;
    const token = response.data.token;
    localStorage.setItem('token', token);
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

export const getUserById = (id) => async (dispatch) => {
  dispatch({ type: 'GET_USER_REQUEST' });

  try {
    const response = await axios.get(`http://localhost:5000/api/auth/${id}`);
    const user = response.data;
    dispatch({ type: 'GET_USER_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'GET_USER_FAILURE', payload: error.response?.data?.message || error.message });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: 'GET_ALL_USERS_REQUEST' });

  try {
    const response = await axios.get('http://localhost:5000/api/auth');
    const users = response.data;
    dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: users });
  } catch (error) {
    dispatch({ type: 'GET_ALL_USERS_FAILURE', payload: error.response?.data?.message || error.message });
  }
};
  
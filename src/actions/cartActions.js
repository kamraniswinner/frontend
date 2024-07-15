import axios from 'axios';
import getUserIdFromToken from '../utils/getUserIdFromToken';

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

export const addToCart = (prodId, quantity) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const id = getUserIdFromToken(token);// Assume you have a userId in your auth state
    const userId = id;
    const response = await axios.post(`http://localhost:5000/api/cart/${userId}`, { prodId, quantity });
    const cart = response.data;
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: cart });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const removeFromCart = (prodId) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART_REQUEST });
  try {
    const response = await axios.delete(`http://localhost:5000/api/cart/${prodId}`);
    const cart = response.data;
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: cart });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_CART_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const clearCart = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });
  try {
    const response = await axios.delete(`http://localhost:5000/api/cart/${userId}`);
    const cart = response.data;
    dispatch({ type: CLEAR_CART_SUCCESS, payload: cart });
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const calculateCartTotal = () => async (dispatch) => {
  dispatch({ type: CALCULATE_CART_TOTAL_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const id = getUserIdFromToken(token);// Assume you have a userId in your auth state
    const userId = id;
    const response = await axios.get(`http://localhost:5000/api/cart/calculate/${userId}`);
    const cart = response.data;
    dispatch({ type: CALCULATE_CART_TOTAL_SUCCESS, payload: cart });
  } catch (error) {
    dispatch({
      type: CALCULATE_CART_TOTAL_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getCart = (userId) => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const id = getUserIdFromToken(token);// Assume you have a userId in your auth state
    const userId = id;
    const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    const cart = response.data;
    dispatch({ type: GET_CART_SUCCESS, payload: cart });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

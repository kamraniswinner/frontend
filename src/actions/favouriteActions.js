import axios from 'axios';
import getUserIdFromToken from '../utils/getUserIdFromToken';

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

const apiBaseURL = 'http://localhost:5000/api/favourite';

// Add Favourite Product Action
export const addFavouriteProduct = (prodId) => async (dispatch) => {
  dispatch({ type: ADD_FAVOURITE_PRODUCT_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const id = getUserIdFromToken(token); // Assume you have a userId in your auth state
    const userId = id;
    const response = await axios.post(`${apiBaseURL}/${userId}`, { prodId }, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch({ type: ADD_FAVOURITE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_FAVOURITE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const removeFavouriteProduct = (prodId) => async (dispatch) => {
  dispatch({ type: REMOVE_FAVOURITE_PRODUCT_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const id = getUserIdFromToken(token); // Assume you have a userId in your auth state
    const userId = id;
    await axios.delete(`${apiBaseURL}/${userId}`, { data: { prodId } }, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch({ type: REMOVE_FAVOURITE_PRODUCT_SUCCESS, payload: prodId });
  } catch (error) {
    dispatch({ type: REMOVE_FAVOURITE_PRODUCT_FAILURE, payload: error.message });
  }
};
// Update Favourite Product Action
export const updateFavouriteProduct = (userId,prodId) => async (dispatch) => {
  dispatch({ type: UPDATE_FAVOURITE_PRODUCT_REQUEST });
  try {
    const response = await axios.put(`${apiBaseURL}/${userId}`, prodId, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch({ type: UPDATE_FAVOURITE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_FAVOURITE_PRODUCT_FAILURE, payload: error.message });
  }
};
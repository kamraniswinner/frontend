// src/actions/addressActions.js
import axios from 'axios';

// Action types
export const CREATE_ADDRESS_REQUEST = 'CREATE_ADDRESS_REQUEST';
export const CREATE_ADDRESS_SUCCESS = 'CREATE_ADDRESS_SUCCESS';
export const CREATE_ADDRESS_FAILURE = 'CREATE_ADDRESS_FAILURE';

export const FETCH_ADDRESSES_REQUEST = 'FETCH_ADDRESSES_REQUEST';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_FAILURE = 'FETCH_ADDRESSES_FAILURE';

export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';

export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAILURE = 'DELETE_ADDRESS_FAILURE';

// Create a new address
export const createAddress = (address) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ADDRESS_REQUEST });
    const { data } = await axios.post('http://localhost:5000/api/address', address);
    dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ADDRESS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Fetch all addresses for a user
export const fetchAddresses = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ADDRESSES_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/address/${userId}`);
    dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ADDRESSES_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Update an address
export const updateAddress = (userId, addressIndex, address) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    const { data } = await axios.put(`http://localhost:5000/api/address/${userId}/${addressIndex}`, address);
    dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Delete an address
export const deleteAddress = (userId, addressIndex) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    await axios.delete(`/api/addresses/${userId}/${addressIndex}`);
    dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: addressIndex });
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correctly import thunk as a named export
import authReducer from './reducers/authReducer';
import addressReducer  from './reducers/addressReducer.js';
import  productReducer  from './reducers/productReducer';
import favouriteReducer from './reducers/favouriteReducer.js';
import cartReducer from './reducers/cartReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  address: addressReducer,
  product: productReducer,
  favourite: favouriteReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

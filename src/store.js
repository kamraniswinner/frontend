// src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correctly import thunk as a named export
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

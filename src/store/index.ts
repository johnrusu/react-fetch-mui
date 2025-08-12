import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import appReducer from './appSlice';

const reducer = combineReducers({
  app: appReducer,
});

export const store = configureStore({
  reducer,
});

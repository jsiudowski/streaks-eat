import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; 

const store = configureStore({
  reducer: rootReducer,
  // Add any middleware or other store settings here
});

export default store;

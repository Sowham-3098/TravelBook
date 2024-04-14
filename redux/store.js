import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user'; // Import the corrected user slice

export const store = configureStore({
  reducer: {
    user: userReducer, // Include the user slice in the reducers object
  },
});

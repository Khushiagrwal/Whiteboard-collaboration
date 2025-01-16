import { configureStore } from '@reduxjs/toolkit';
import  useReducer  from './user/userSlice';


const store = configureStore({
  reducer: {user:useReducer}, // Add your slices here, e.g., counter: counterReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if necessary
    }),
});

export default store;

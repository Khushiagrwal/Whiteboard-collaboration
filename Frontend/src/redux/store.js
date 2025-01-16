import { configureStore,combineReducers } from '@reduxjs/toolkit';
import  useReducer  from './user/userSlice';
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";
import persistStore from 'redux-persist/es/persistStore';

const rootReducer= combineReducers({user:useReducer})
const persistConfig={
    key:"root",
    storage,
    version:1
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
//   reducer: {user:useReducer}, // Add your slices here, e.g., counter: counterReducer
    reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if necessary
    }),
});

export const persistor=persistStore(store);

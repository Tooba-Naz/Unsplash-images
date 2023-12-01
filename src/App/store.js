import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../collectionReducer'; 

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: [...middleware],
  devTools: true,
});

export default store;

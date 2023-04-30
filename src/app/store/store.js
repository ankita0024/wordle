import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
  });
export default store;
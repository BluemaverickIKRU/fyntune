import { configureStore } from '@reduxjs/toolkit';
import shopListSlice from './shopListSlice';

const store = configureStore({
  reducer: {
    shopList: shopListSlice,
  },
});

export default store;

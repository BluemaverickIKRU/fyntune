import { createSlice } from '@reduxjs/toolkit';

const shopListSlice = createSlice({
  name: 'shopList',
  initialState: {
    shops: [],
  },
  reducers: {
    addShop: (state, action) => {
      state.shops.push(action.payload);
    },
    updateShop: (state, action) => {
      const updatedShopList = state.shops.map((shop) => {
        if (shop.id === action.payload.id) {
          return action.payload;
        } else {
          return shop;
        }
      });
      state.shops = updatedShopList;
    },
    deleteShop: (state, action) => {
      const filterdShops = state.shops.filter(
        (shop) => shop.id !== action.payload
      );
      state.shops = filterdShops;
    },
  },
});

export const { addShop, updateShop, deleteShop } = shopListSlice.actions;

export default shopListSlice.reducer;

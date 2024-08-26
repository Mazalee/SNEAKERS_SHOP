import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartModalOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCartModal(state) {
      state.isCartModalOpen = true;
    },
    closeCartModal(state) {
      state.isCartModalOpen = false;
    },
    toggleCartModal(state) {
      state.isCartModalOpen = !state.isCartModalOpen;
    },
  },
});

export const cartActions = cartSlice.actions;

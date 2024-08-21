import { productSlice } from "@/features/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});

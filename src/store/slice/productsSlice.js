import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload.results;
      state.next = action.payload.next;
      state.count = action.payload.count;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

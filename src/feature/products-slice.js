import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
  },
});

export default productsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  initialState: { open: false },
  name: "opencart",
  reducers: {
    togglecart(state, action) {
      state.open = action.payload;
    },
  },
});

export default slice.reducer;
export const { togglecart } = slice.actions;

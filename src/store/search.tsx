import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: { result: "notebook" },
  reducers: {
    wordsearch(state, action) {
      state.result = action.payload;
    },
  },
});

export default slice.reducer;
export const { wordsearch } = slice.actions;

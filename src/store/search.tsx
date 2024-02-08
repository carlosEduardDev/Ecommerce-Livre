import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: { search: "notebook" },
  reducers: {
    wordsearch(state, action) {
      state.search = action.payload;
    },
  },
});

export default slice.reducer;
export const { wordsearch } = slice.actions;

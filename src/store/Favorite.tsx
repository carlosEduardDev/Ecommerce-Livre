import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "favorite",
  initialState: { item: [] },
  reducers: {
    addfavorites(
      state: {
        item: { title: string; image: string; price: number; id: string }[];
      },
      action
    ) {
      const equal = state.item.filter(
        (item: { title: string }) => item.title === action.payload.title
      );
      equal[0] ? null : state.item.push(action.payload);
    },
    removefavorites(
      state: {
        item: { title: string; image: string; price: number; id: string }[];
      },
      action
    ) {
      const equal = state.item.findIndex(item => item.id === action.payload);
      state.item = state.item.filter(item => item !== state.item[equal])
    },
  },
});

export default slice.reducer;
export const { addfavorites, removefavorites } = slice.actions;

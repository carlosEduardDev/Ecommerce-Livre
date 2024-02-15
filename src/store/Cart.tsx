import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addcart(
      state: {
        items: { title: string; image: string; price: number; id: string }[];
      },
      action
    ) {
      const equal = state.items.filter(
        (item: { title: string }) => item.title === action.payload.title
      );
      equal[0] ? null : state.items.push(action.payload);
    },
  },
});

export default slice.reducer;
export const { addcart } = slice.actions;

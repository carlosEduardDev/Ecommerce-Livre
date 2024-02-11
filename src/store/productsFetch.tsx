import { Dispatch, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "productsFetch",
  initialState: { loading: false, data: null, error: null },
  reducers: {
    fecthStarted(state) {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

const { fecthStarted, fetchSuccess, fetchError } = slice.actions;

export const fetchProduct = async (url: string, dispatch: Dispatch) => {
  try {
    dispatch(fecthStarted());
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${url}`
    );
    const data = await response.json();
    return dispatch(fetchSuccess(data));
  } catch (error) {
    if (error instanceof Error) return dispatch(fetchError(error.message));
  }
};

export default slice.reducer;

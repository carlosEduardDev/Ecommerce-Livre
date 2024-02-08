import { configureStore } from "@reduxjs/toolkit";
import search from './search.tsx'

const store = configureStore({
  reducer: search
});

export default store;

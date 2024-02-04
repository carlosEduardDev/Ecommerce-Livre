import { configureStore } from "@reduxjs/toolkit";
import count from './count'

const store = configureStore({
  reducer: count
});

export default store;

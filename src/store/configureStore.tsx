import { combineReducers, configureStore } from "@reduxjs/toolkit";
import search from "./search.tsx";
import productsFetch from "./productsFetch.tsx";

const reducer = combineReducers({ search, productsFetch });

const store = configureStore({
  reducer,
});

export default store;

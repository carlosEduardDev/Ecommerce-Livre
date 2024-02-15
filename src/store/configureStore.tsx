import { combineReducers, configureStore } from "@reduxjs/toolkit";
import search from "./Search.tsx";
import productsFetch from "./ProductsFetch.tsx";
import cart from "./Cart.tsx";

const reducer = combineReducers({ search, productsFetch, cart });

const store = configureStore({
  reducer,
});

export default store;

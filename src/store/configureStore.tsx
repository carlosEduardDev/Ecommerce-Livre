import { combineReducers, configureStore } from "@reduxjs/toolkit";
import search from "./Search.tsx";
import productsFetch from "./ProductsFetch.tsx";
import cart from "./Cart.tsx";
import favorite from "./Favorite.tsx";

const reducer = combineReducers({ search, productsFetch, cart, favorite });

const store = configureStore({
  reducer,
});

export default store;

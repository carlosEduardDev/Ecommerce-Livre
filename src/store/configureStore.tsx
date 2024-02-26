import { combineReducers, configureStore } from "@reduxjs/toolkit";
import search from "./search.tsx";
import productsFetch from "./productsFetch.tsx";
import cart from "./Cart.tsx";
import favorite from "./Favorite.tsx";
import opencart from "./OpenCart.tsx";

const reducer = combineReducers({
  search,
  productsFetch,
  cart,
  favorite,
  opencart,
});

const store = configureStore({
  reducer,
});

export default store;

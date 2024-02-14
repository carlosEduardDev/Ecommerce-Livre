import { combineReducers, configureStore } from "@reduxjs/toolkit";
import search from "./search.tsx";
import productsFetch from "./productsFetch.tsx";
import bag from "./bag.tsx";

const reducer = combineReducers({ search, productsFetch, bag });

const store = configureStore({
  reducer,
});

export default store;

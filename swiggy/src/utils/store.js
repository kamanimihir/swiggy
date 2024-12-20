import { configureStore, createSlice } from "@reduxjs/toolkit";
import toogleSlice from "./ToogaleSlice";
import CartSlice from "./CartSlice";
import filterSlice from "./filterSlice";
import authSlice from "./Authslic";

const store = configureStore({
  reducer: {
    toogleSlice: toogleSlice,
    CartSlice: CartSlice,
    filterSlice: filterSlice,
    authSlice: authSlice,
  },
});

export default store;

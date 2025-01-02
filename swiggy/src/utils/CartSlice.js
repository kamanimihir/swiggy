import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
    resInfo: JSON.parse(localStorage.getItem("resInfo")) || [],
  },

  reducers: {
    addToCart: (state, actions) => {
      const { info, resInfo } = actions.payload;
      state.cartItems = [...state.cartItems, info];
      state.resInfo = resInfo || [];
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
      localStorage.setItem("resInfo", JSON.stringify(state.resInfo));
    },
    deletItem: (state, actions) => {
      state.cartItems = actions.payload || [];
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.resInfo = [];
      localStorage.removeItem("cartData");
      localStorage.removeItem("resInfo");
    },
  },
});

export const { addToCart, deletItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;

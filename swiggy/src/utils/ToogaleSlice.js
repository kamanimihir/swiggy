import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
  name: "toogleSlice",
  initialState: {
    searcBarToogle: false,
    loginToogle: false,
  },
  reducers: {
    toogelSearchBar: (state, actions) => {
      state.searcBarToogle = !state.searcBarToogle;
    },
    toogleLogins: (state, actions) => {
      state.loginToogle = !state.loginToogle;
    },
  },
});
export const { toogelSearchBar,toogleLogins } = toogleSlice.actions;
export default toogleSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'AuthSlice',
    initialState:{
        userData: JSON.parse(localStorage.getItem("userData"))
    },
    reducers: {
        addUserData:(state,actions)=>{
            state.userData = actions.payload
            localStorage.setItem("userData",JSON.stringify(actions.payload))
        },
        removUserData:(state,actions)=>{
            state.userData = null
            localStorage.removeItem("userData")
        }
    }
});

export const{addUserData,removUserData} = authSlice.actions
export default authSlice.reducer;
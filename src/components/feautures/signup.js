import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
    name: "signup",
    initialState: {
        isSeller: null,
    },
    reducers: {
        signUp: (state, action) => {
            state.isSeller = action.payload;
        },
    },
});

export const { signUp } = signupSlice.actions; 
export default signupSlice.reducer; 

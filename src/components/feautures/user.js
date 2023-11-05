import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name :"user",
    initialState :{value :{userId:null ,isSeller :false , userName:"" , imgUrl: ""}},

    reducers:{
        signIn:(state,action)=> {
            state.value = action.payload
        },

        
    }
})
export const {signIn}=userSlice.actions
 export default userSlice.reducer
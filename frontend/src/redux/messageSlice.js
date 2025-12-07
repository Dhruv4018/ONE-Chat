import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
      messages:[]
    },
    reducers:{
      setMessageData:(state,action)=>{
        state.messages=action.payload
      }  
    }

})

export const {setMessageData} = messageSlice.actions

export default messageSlice.reducer
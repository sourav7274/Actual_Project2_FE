import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTags = createAsyncThunk("get/tags",async() =>{
    const response = await axios.get("http://localhost:3000/allTags")

    const result = response.data
    // console.log(result.tags)
    return result.tags
})


const tagSlice = createSlice({
    name:"tags",
    initialState:{
        tags:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getTags.pending,(state) =>{
            state.status = "loading"
        })
        builder.addCase(getTags.fulfilled,(state,action) =>{
            state.status = "success"
            state.tags = action.payload
        })
        builder.addCase(getTags.rejected,(state,action) =>{
            state.error = action.error.message
        })
    }
})

export default tagSlice.reducer

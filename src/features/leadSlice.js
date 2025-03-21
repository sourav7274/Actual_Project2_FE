import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const getAllLeads = createAsyncThunk("get/allLead",async () =>{
    const response =await axios.get("http://localhost:3000/allLeads")

    const result = await response.data
    return result
})

export const addLead = createAsyncThunk('add/lead',async (data) =>{
    const response = await axios.post("http://localhost:3000/newLead",data)

    const result = await response.data
    return result
})

export const getLeadById = createAsyncThunk('get/IdLead',async(id) =>{
    const response = await axios.get(`http://localhost:3000/getLeadById/${id}`) 

    const result = await response.data
    // console.log(result.leads)
    return result.leads
})

export const addComment = createAsyncThunk("add/comment",async ({id,data}) =>{
    console.log(id,data)
    const response = await axios.post(`http://localhost:3000/leads/${id}/comment`,data)

    const result = await response.data
    console.log(result)
})

const leadSlice = createSlice({
    name:"leads",
    initialState:{
        leads:[],
        status: "idle",
        error: null,
        currentLead:{}
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getAllLeads.pending, (state) =>{
            state.status = "loading"
        }) 
        builder.addCase(getAllLeads.fulfilled, (state,action)  => {
            state.status = "success"
            state.leads = action.payload.leads
        })
        builder.addCase(getAllLeads.rejected,(state,action) =>{
            state.error = action.error.message
        })
        builder.addCase(addLead.fulfilled,(state) => {
            state.status = "success"
        })
        builder.addCase(getLeadById.fulfilled,(state,action) =>{
            state.currentLead = action.payload
        })
    }
})

export default leadSlice.reducer
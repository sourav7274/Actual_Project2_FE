import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSaleAgents = createAsyncThunk("get/saleAgent", async () => {
  const response = await axios.get(
    "https://actaul-prpject-be.vercel.app/allAgents"
  );

  const result = response.data;
  // console.log(result.agents)
  return result.agents;
});

export const addAgent = createAsyncThunk("add/agent", async (data) => {
  const response = await axios.post(
    "https://actaul-prpject-be.vercel.app/agents",
    data
  );

  const result = response.data;
  console.log(result);
  return result;
});

const saleAgentSlice = createSlice({
  name: "saleAgent",
  initialState: {
    saleAgent: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSaleAgents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSaleAgents.fulfilled, (state, action) => {
      state.status = "success";
      state.saleAgent = action.payload;
    });
    builder.addCase(getSaleAgents.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default saleAgentSlice.reducer;

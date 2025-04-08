import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllLeads = createAsyncThunk("get/allLead", async () => {
  const response = await axios.get(
    "https://actaul-prpject-be.vercel.app/allLeads"
  );

  const result = await response.data;
  return result;
});

export const addLead = createAsyncThunk("add/lead", async (data) => {
  const response = await axios.post(
    "https://actaul-prpject-be.vercel.app/newLead",
    data
  );

  const result = await response.data;
  return result;
});

export const getLeadById = createAsyncThunk("get/IdLead", async (id) => {
  const response = await axios.get(
    `https://actaul-prpject-be.vercel.app/getLeadById/${id}`
  );

  const result = await response.data;
  // console.log(result.leads)
  return result.leads;
});

export const addComment = createAsyncThunk(
  "add/comment",
  async ({ id, data }) => {
    // console.log(id,data)
    const response = await axios.post(
      `https://actaul-prpject-be.vercel.app/leads/${id}/comment`,
      data
    );

    const result = await response.data;
    // console.log(result)
  }
);

export const getLeadCommentById = createAsyncThunk(
  "get/comments",
  async (id) => {
    const response = await axios.get(
      `https://actaul-prpject-be.vercel.app/leads/${id}/comment`
    );

    const result = await response.data;
    // console.log(result.comments)
    return result.comments;
  }
);

const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    status: "idle",
    error: null,
    currentLead: {},
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllLeads.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = action.payload.leads;
    });
    builder.addCase(getAllLeads.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(addLead.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(getLeadById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getLeadById.fulfilled, (state, action) => {
      (state.currentLead = action.payload), (state.status = "success");
    });
    builder.addCase(getLeadCommentById.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default leadSlice.reducer;

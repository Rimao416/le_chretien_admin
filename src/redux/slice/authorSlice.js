import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { API } from "../../config";
// API.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });
API.defaults.withCredentials = true;
export const createAuthor = createAsyncThunk(
  "authorsApi/createAuthor",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    try {
      const response = await API.post("/api/v1/authors", credentials);
      // console.log(response);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllAuthors = createAsyncThunk(
  "authorsApi/getAllAuthors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/v1/authors");
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error)
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const authorSlice = createSlice({
  name: "author",
  initialState: {
    authors: [],
    loading: false,
    error: false,
    status: "idle",
  },

  reducers: {
    initializeState: (state) => {
      return {
        ...state,
        status: "idle",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAuthor.pending, (state) => {
        state.loading = true;
        state.status = "idle";
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = [...state.authors, action.payload.data.author];
        state.status = "success";
      })
      .addCase(createAuthor.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.status = "failed";
      })
      .addCase(getAllAuthors.pending, (state) => {
        state.loading = true;
        state.status = "idle";
      })
      .addCase(getAllAuthors.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.authors = action.payload.data.authors;
        state.status = "success";
      })
      .addCase(getAllAuthors.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.status = "failed";
      });
  },
});

export const { initializeState } = authorSlice.actions;
export default authorSlice.reducer;

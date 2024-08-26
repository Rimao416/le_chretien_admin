import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
import { fetchData } from "../../utils/handleFactory";
API.defaults.withCredentials = true;
export const getAllCategories = createAsyncThunk(
  "categoriesApi/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/v1/categories");
      console.log(response);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const createCategory = createAsyncThunk(
  "authorsApi/createCategory",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    try {
      const response = await API.post("/api/v1/categories", credentials);
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

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: false,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        console.log("Je me lance");
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        // console.log(action.payload.data.categories)
        state.loading = false;
        state.categories = action.payload.data.categories;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createCategory.pending, (state) => {
        // console.log("Je me lance")
        state.loading = true;
        state.status = "idle";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = [...state.categories, action.payload.data.category];
        state.status = "success";
      })
      .addCase(createCategory.rejected, (state) => {
        
        state.loading = false;
        state.error = true;
      });
  },
});
export default categorySlice.reducer;

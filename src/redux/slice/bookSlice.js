import { API } from "../../config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
API.defaults.withCredentials = true;
export const createBook = createAsyncThunk(
  "books/createBook",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/v1/books", credentials);
      // console.log(response);
      return response;
    } catch (error) {
      console.log("Il 'ya une erreur", error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/v1/books");
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials.get("id"))
    try {
      const response = await API.put(
        `/api/v1/books/${credentials.get("id")}`,
        credentials
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: false,
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
      .addCase(createBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          books: [...state.books, action.payload.data.book],
          loading: false,
          error: false,
        };
      })
      .addCase(createBook.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(getAllBooks.pending, (state) => {
        return {
          ...state,
          loading: true,
          status: "idle",
        };
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        console.log(action)
        return {
          ...state,
          books: action.payload.data.books,
          loading: false,
          status: "success",
        };
      })
      .addCase(getAllBooks.rejected, (state) => {
        return {
          ...state,
          loading: false,
          status: "failed",
        };
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        console.log(action);
        const updatedBook = action.payload.data.book;
        const updatedBooks = state.books.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        );
        return {
          ...state,
          books: updatedBooks,
          loading: false,
          error: false,
        };
      })
      .addCase(updateBook.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      });
  },
});
export default bookSlice.reducer;
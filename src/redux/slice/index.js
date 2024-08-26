import { combineReducers } from "redux";
import authorReducer from "./authorSlice";
import categoryReducer from "./categorySlice";
import bookReducer from "./bookSlice";
// import { configureStore } from "@reduxjs/toolkit";

// import academicYearReducer from "./academicYearReducer";
export const reducers = combineReducers({
  authorReducer,
  categoryReducer,
  bookReducer
});
// export const store = configureStore({ auth: authReducer });
// export const store = configureStore({
//     reducer: {
//       auth: authReducer
//     },
//   })

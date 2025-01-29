import { configureStore } from "@reduxjs/toolkit";
import { categoryAPI } from "./api/categoryAPI";
import { authAPI } from "./api/authAPI";
import { authReducer } from "./reducer/authReducer";
const store = configureStore({
  reducer: {
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [authReducer.name]: authReducer.reducer,
  },
  middleware: (mid) => [...mid(), categoryAPI.middleware, authAPI.middleware],
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { categoryAPI } from "./api/categoryAPI";
import { authAPI } from "./api/authAPI";
import { authReducer } from "./reducer/authReducer";
import { userAPI } from "./api/userAPI";
import { courseAPI } from "./api/courseAPI";
const store = configureStore({
  reducer: {
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [authReducer.name]: authReducer.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [courseAPI.reducerPath]: courseAPI.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    categoryAPI.middleware,
    authAPI.middleware,
    userAPI.middleware,
    courseAPI.middleware,
  ],
});

export default store;

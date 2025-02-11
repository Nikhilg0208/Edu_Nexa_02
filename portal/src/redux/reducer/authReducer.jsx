import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token") || null,
  role: null,
  isAuthenticated: false,
};

if (initialState.token) {
  try {
    const decodedToken = jwtDecode(initialState.token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      initialState.token = null;
      initialState.isAuthenticated = false;
      localStorage.removeItem("token");
    } else {
      initialState.role = decodedToken.role || null;
      initialState.isAuthenticated = true;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    initialState.token = null;
    initialState.role = null;
    initialState.isAuthenticated = false;
    localStorage.removeItem("token");
  }
}

export const authReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action) {
      const { token } = action.payload;
      try {
        const decodedToken = jwtDecode(token);
        state.token = token;
        state.role = decodedToken.role || null;
        state.isAuthenticated = true;
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Invalid token:", error);
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      }
    },

    logout(state) {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setAuth, logout } = authReducer.actions;
export default authReducer.reducer;

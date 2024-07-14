import React from "react"
import { configureStore } from "@reduxjs/toolkit"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import rootReducer from "./reducer"

const store = configureStore({
  reducer: rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
)

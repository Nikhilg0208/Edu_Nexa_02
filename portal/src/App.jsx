import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./components/common/Loader";
import ProtectedRoute from "./components/common/Protected-route";
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./components/AdminSidebar"));
const Categories = lazy(() => import("./pages/Categories"));
// const Challenge = lazy(() => import("./pages/Challenge"));
// const User = lazy(() => import("./pages/User"));
function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/admin/dashboard/challenge"
              element={
                <ProtectedRoute>
                  <Challenge />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />{" "} */}
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

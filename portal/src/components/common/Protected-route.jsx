import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token, role, isAuthenticated } = useSelector((state) => state.auth);
  if (token !== null && isAuthenticated && role === "Admin") {
    return children;
  } else {
    console.log("Not authorized");
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;

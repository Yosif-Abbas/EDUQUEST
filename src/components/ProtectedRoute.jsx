import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = true;
  // Simulating auth check

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

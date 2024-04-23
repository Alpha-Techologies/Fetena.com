import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ isAuthenticated, children }) {
//   console.log(isAuthenticated, "isAuthenticated");
  if (!isAuthenticated) {
    return (
      <Navigate
        to='/sign-in'
        replace
      />
    );
  }
  return children;
}

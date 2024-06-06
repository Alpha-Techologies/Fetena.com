import { Navigate } from "react-router-dom";

const TakeExamRoute = ({ isAuthenticated, children }) => {
    
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
export default TakeExamRoute
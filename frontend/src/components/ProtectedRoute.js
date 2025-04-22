import React from "react";
import { Route, Redirect } from "react-router-dom";

// ✅ Allows only superAdmins
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role"); 

  return (
    <Route
      {...rest}
      render={(props) =>
        token && userRole === "superAdmin" ? ( 
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> 
        )
      }
    />
  );
};

export default ProtectedRoute;

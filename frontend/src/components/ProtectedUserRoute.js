import React from "react";
import { Route, Redirect } from "react-router-dom";

// ✅ Allows only logged-in users (User or Admin)
const ProtectedUserRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token"); // Check if user is logged in
  const userRole = localStorage.getItem("role"); // Get stored user role

  return (
    <Route
      {...rest}
      render={(props) =>
        token && (userRole === "superAdmin" || userRole === "user") ? ( 
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> // Redirect unauthorized users to login
        )
      }
    />
  );
};

export default ProtectedUserRoute;

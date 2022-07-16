import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, Router } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Navigate to="/auth" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/auth" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;

import React from "react";
import AclService from "./AClServices";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { component: Component, isAuthenticated, role, path } = props;
  const aclServices = new AclService(role);
  const permitted = aclServices.hasPermission(path);
  const whiteListUrl = ["not-found", aclServices.redirectUrl];
  let redirect = "/";
  redirect = (isAuthenticated && !permitted && aclServices.redirectUrl) || "/";

  return (
    <>
      <div>
        {isAuthenticated && (permitted || whiteListUrl.includes(path)) ? (
          Component
        ) : (
          <Navigate to={redirect} />
        )}
      </div>
    </>
  );
};

export default PrivateRoute;

import React from "react";
import PropTypes from "prop-types";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const RouteWithLayout = (props) => {
  const isAuthenticated = sessionStorage.getItem("login");
  const role = sessionStorage.getItem("role");
  const {
    layout: Layout,
    component: Component,
    protectedRoute,
    ...rest
  } = props;

  return protectedRoute ? (
    <PrivateRoute
      isAuthenticated={isAuthenticated}
      role={role}
      component={
        <Layout>
          <Component />
        </Layout>
      }
      {...rest}
    />
  ) : (
    <PublicRoute
      role={role}
      isAuthenticated={isAuthenticated}
      component={
        <Layout>
          <Component />
        </Layout>
      }
      {...rest}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  // path: PropTypes.string.isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  protectedRoute: PropTypes.bool,
};

export default RouteWithLayout;

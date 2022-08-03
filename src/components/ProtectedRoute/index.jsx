import React from "react";
import PropTypes from "prop-types";
import { authService } from "../../services";
import NotFound from "../NotFound";

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function ProtectedRoute(props) {
  const { children } = props;

  if (!authService.auth.currentUser) return <NotFound />;

  return children;
}

export default ProtectedRoute;

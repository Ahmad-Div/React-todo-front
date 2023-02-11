import React from "react";
import PropTypes from "prop-types";
import auth from "../redux/reducers/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { connect } from "react-redux";
function PrivateRoutes({ auth: { isAuthenticated, user } }) {
  const location = useLocation();
  return isAuthenticated && user ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />;
}
PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(PrivateRoutes);

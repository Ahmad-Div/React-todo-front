import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
const Layout = ({ auth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.hash !== "") {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="layout">
      {" "}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Layout);

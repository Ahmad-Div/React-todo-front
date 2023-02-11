import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const Layout = () => {
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
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

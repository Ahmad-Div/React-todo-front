import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MobileNav from "./MobileNav";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Header = ({ auth }) => {
  const [languages, setLanguages] = useState(false);
  const [mobNav, setMobNav] = useState(false);

  const { t, i18n } = useTranslation();

  const userImage = (
    <>
      {auth.isAuthenticated && (
        <>
          {auth.user.image !== "" ? (
            <Link to={`/profile`}>
              <img className="profileImage" src={auth.user.image} alt="" />
            </Link>
          ) : (
            <Link to={`/profile`}>
              <div className="tempUserImage flex flex-row  justify-center align-center">{auth.user.name.charAt(0).toUpperCase()}</div>
            </Link>
          )}
        </>
      )}
    </>
  );

  const language = (
    <>
      {languages && (
        <div className="position-absolute languagesList flex flex-column justify-center align-center gap-1">
          <span
            onClick={() => {
              i18n.changeLanguage("en");
              localStorage.setItem("lang", "en");
              setLanguages(true);
            }}
          >
            EN
          </span>
          <span
            onClick={() => {
              setLanguages(true);
              localStorage.setItem("lang", "kr");

              i18n.changeLanguage("kr");
            }}
          >
            KR
          </span>
          <span
            onClick={() => {
              i18n.changeLanguage("ar");
              localStorage.setItem("lang", "ar");

              setLanguages(true);
            }}
          >
            AR
          </span>
        </div>
      )}
    </>
  );

  const headerContent = auth.isAuthenticated ? (
    <>
      {mobNav && <MobileNav t={t} i18n={i18n} mobNav={mobNav} setMobNav={setMobNav} />}

      <Link to="/">
        <img src="/images/logo.png" alt="" className="logo" />
      </Link>
      <nav className="navigation flex flex-row justify-center align-center  gap-3">
        <ul className="navList flex flex-row justify-right align-center gap-2">
          <NavLink to="/">
            <li className="navItem">{t("nav.home")}</li>
          </NavLink>
          <NavLink to="/todo">
            <li className="navItem">{t("nav.todo")}</li>
          </NavLink>
          <NavLink to="/plan">
            <li className="navItem">{t("nav.plan")}</li>
          </NavLink>
          <NavLink to="/about">
            <li className="navItem">{t("nav.about")}</li>
          </NavLink>
        </ul>
      </nav>
      <div className="flex flex-row justify-center align-center gap-1">
        <div onClick={() => setLanguages((prev) => !prev)} className="languageDiv  flex flex-row justify-center align-center">
          <div className="languageDivBox flex  flex-row justify-center align-center">
            {" "}
            <span>{i18n.language === "en" ? "EN" : i18n.language === "kr" ? "KR" : "AR"}</span>
            <span>
              <i className="fa-solid fa-globe"></i>
            </span>
          </div>

          {language}
        </div>
        {userImage}
        {mobNav ? (
          <span
            onClick={() => {
              setMobNav(false);
            }}
            style={{
              fontSize: "1.5rem",
              height: "fit-content",
            }}
            className="xMobNav"
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        ) : (
          <span
            onClick={() => {
              setMobNav(true);
            }}
            className="humb"
            style={{
              fontSize: "1.5rem",
              height: "fit-content",
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </span>
        )}
      </div>
    </>
  ) : (
    <>
      <Link to="/auth">
        <img src="/images/logo.png" alt="" className="logo" />
      </Link>
      <div className="flex flex-row justify-center align-center gap-1">
        {language}
        <Link to="/auth/login" className="loginButton">
          Log in
        </Link>
        <Link to="/auth/register" className="registerButton">
          Sign Up
        </Link>
      </div>
    </>
  );

  return <header className="header flex flex-row justify-between align-center w-100">{headerContent}</header>;
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);

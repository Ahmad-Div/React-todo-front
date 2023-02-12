import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MobileNav from "./MobileNav";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Header = ({ auth }) => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState(false);
  const [mobNav, setMobNav] = useState(false);

  const { t, i18n } = useTranslation();

  const userImage = (
    <>
      {auth.user.image !== "" ? (
        <img className="profileImage" src={auth.user.image} alt="" />
      ) : (
        <div className="tempUserImage flex flex-row  justify-center align-center">{auth.user.name.charAt(0).toUpperCase()}</div>
      )}
    </>
  );

  return (
    <header className="header flex flex-row justify-between align-center w-100">
      {mobNav && <MobileNav t={t} i18n={i18n} mobNav={mobNav} setMobNav={setMobNav} />}

      <h1 className="logo">{t("todoApp")}</h1>
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
        <Link to={`/profile`} className="profile flex flex-row justify-center align-center gap-1">
          {userImage}
          <span className="profileName">{auth.user.name}</span>
        </Link>
        <div onClick={() => setLanguages((prev) => !prev)} className="languageDiv  flex flex-row justify-center align-center">
          <div className="languageDivBox flex  flex-row justify-center align-center">
            {" "}
            <span>{i18n.language === "en" ? "EN" : i18n.language === "kr" ? "KR" : "AR"}</span>
            <span>
              <i className="fa-solid fa-globe"></i>
            </span>
          </div>

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
        </div>
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
    </header>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);

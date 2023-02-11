import React from "react";
import { NavLink } from "react-router-dom";

const MobileNav = ({ setMobNav, mobNav, t, i18n }) => {
  return (
    <nav className={`${mobNav ? "mobileNav mobNavAnim" : "mobileNav"}`}>
      <ul className="flex flex-column justify-center align-center gap-2 w-100">
        <NavLink to="/" onClick={() => setMobNav(false)} className="navItem">
          <li>{t("nav.home")}</li>
        </NavLink>

        <NavLink to="/todo" onClick={() => setMobNav(false)} className="navItem">
          <li>{t("nav.todo")}</li>
        </NavLink>

        <NavLink to="/plan" onClick={() => setMobNav(false)} className="navItem">
          <li>{t("nav.plan")}</li>
        </NavLink>

        <NavLink to="/about" onClick={() => setMobNav(false)} className="navItem">
          <li>{t("nav.about")}</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default MobileNav;

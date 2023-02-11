import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import store from "../../redux/store";
import { loadUser } from "../../actions/auth";
const Home = ({ auth }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  if (!auth.isAuthenticated) {
    return navigate("/auth/login");
  }

  return (
    <section className="home flex flex-column justify-left align-center w-100 gap-3">
      <div className="content w-100">
        <h1 className="headers">{t("nav.home")}</h1>
        <p className="welcomeHome headers">
          {t("home.welcome")} <span className="username">{auth.user.username}</span>
        </p>
        <p>{t("home.desc")}</p>
      </div>
      <div className="infoCards flex flex-row justify-center align-center gap-2 w-100 flex-wrap">
        <Link to="/todo" className="infoCard flex flex-column justify-center align-center gap-1">
          <h3>{t("home.todo")}</h3>
          <p>{t("home.todoCard")}</p>
        </Link>
        <Link to="/plan" className="infoCard flex flex-column justify-center align-center gap-1">
          <h3>{t("home.plan")}</h3>
          <p>{t("home.planCard")}</p>
        </Link>
      </div>
    </section>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
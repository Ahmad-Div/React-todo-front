import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { REFRESH } from "../../actions/types";
const Home = ({ auth }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //to reload the page

  useEffect(() => {
    if (!auth.refresh) {
      dispatch({
        type: REFRESH,
      });
      window.location.reload();
    }
  }, [auth, dispatch, REFRESH]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return navigate("/auth");
    }
  }, [auth.isAuthenticated]);

  return (
    <section className="home flex flex-column justify-left align-center w-100 gap-3">
      <div className="content w-100">
        <p className="welcomeHome headers">
          {t("home.welcome")} <span className="username">{auth.user.username}</span>
        </p>
        <p>{t("home.desc")}</p>
      </div>
      <div className="infoCards flex flex-row justify-center align-center gap-2 w-100 flex-wrap">
        <Link to="/todo" className="infoCard flex flex-column justify-center align-center gap-1">
          <h3>{t("home.todo")}</h3>
          <i className="fa-solid fa-clipboard-check"></i>
          <p>{t("home.todoCard")}</p>
        </Link>
        <Link to="/plan" className="infoCard flex flex-column justify-center align-center gap-1">
          <h3>{t("home.plan")}</h3>
          <i className="fa-regular fa-map"></i>
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

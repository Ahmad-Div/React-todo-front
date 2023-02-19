import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const Welcome = ({ auth }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      return navigate("/");
    }
  }, [auth.isAuthenticated]);
  return (
    <section className="welcome flex flex-column justify-left align-center w-100 gap-2 position-relative">
      <h1 className="headers">
        Tasks, just tasks <span className="dot">.</span>
      </h1>
      <p className="welcomeParagraph">Keep track of the daily tasks adn get that satisfaction upon completion</p>
      <div className="flex flex-row justify-center align-center gap-2 flex-wrap">
        <Link to="/auth/login" className="getStartButton">
          Get Started
        </Link>
        <button className="learnMoreButton">Learn More</button>
      </div>
      <div className="ball coloredBall big position-absolute"></div>
      <div className="ball coloredBall small position-absolute"></div>
      <div className="ball blackBall big position-absolute"></div>
      <div className="ball blackBall small position-absolute"></div>
    </section>
  );
};

Welcome.prototypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Welcome);

import React from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <section className="error404Page flex flex-column justify-center align-center w-100 gap-3 position-relative">
      <h3>404 - Looks like you're lost.</h3>
      <p>
        Maybe this page used to exist or your just spelled something wrong.
        <br />
        Chances are you spelled something wrong, so can you double check the URL?
      </p>

      <Link className="toHome" to="/">
        Return Home
      </Link>
      <div className="ball coloredBall big position-absolute"></div>
      <div className="ball coloredBall small position-absolute"></div>
      <div className="ball blackBall big position-absolute"></div>
      <div className="ball blackBall small position-absolute"></div>
    </section>
  );
};

export default ErrorPage;

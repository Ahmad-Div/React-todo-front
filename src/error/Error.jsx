import React, { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <section className="errorPage flex flex-column justify-center align-center w-100 gap-3 position-relative">
      <h3>{error.message}</h3>
      <p>
        Maybe this page used to exist or your just spelled something wrong.
        <br />
        Chances are you spelled something wrong, so can you double check the URL?
      </p>

      <div className="flex flex-row justify-center align-center gap-2">
        <button onClick={() => navigate(-1)}>GO BACK</button>
        <Link className="toHome" to="/">
          HOME PAGE
        </Link>
      </div>
      <div className="ball coloredBall big position-absolute"></div>
      <div className="ball coloredBall small position-absolute"></div>
      <div className="ball blackBall big position-absolute"></div>
      <div className="ball blackBall small position-absolute"></div>
    </section>
  );
};

export default Error;

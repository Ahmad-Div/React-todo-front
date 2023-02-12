import React, { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <section className="errorPage w-100 flex flex-column justify-center align-center gap-3">
      <h1>{error.message}</h1>
      <div className="flex flex-row justify-center align-center gap-2">
        <button onClick={() => navigate(-1)}>GO BACK</button>
        <Link className="toHome" to="/">
          HOME PAGE
        </Link>
      </div>
    </section>
  );
};

export default Error;

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="error404Page flex flex-column justify-center align-center w-100 gap-3">
      <h1>404</h1>
      <h3>Oops! Something wrong...</h3>
      <div className="flex flex-row justify-center align-center gap-2">
        <button onClick={() => navigate(-1)}>GO BACK</button>
        <Link className="toHome" to="/">
          HOME PAGE
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;

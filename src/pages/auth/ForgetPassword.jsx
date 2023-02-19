import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Spinner } from "@chakra-ui/react";
import { forgetPassword } from "../../actions/auth";
const ForgetPassword = ({ forgetPassword, auth, errors }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const onSubmit = () => {
    forgetPassword(input, navigate);
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      return navigate("/");
    }
  }, [auth]);

  return (
    <section className="login flex flex-column justify-center align-center gap-1 position-relative">
      <div className="ball coloredBall big position-absolute"></div>
      <div className="ball blackBall small position-absolute"></div>
      <h1 className="headers">
        Enter Your Email <span>:</span>
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="loginBox flex flex-column justify-center align-center gap-1"
      >
        <div className="inputDiv w-100 position-relative flex flex-column justify-center align-center">
          <input
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "13" && !e.shiftKey) {
                onSubmit();
              }
            }}
            value={input}
            placeholder="Email"
            type="email"
            name="email"
            id="email"
          />{" "}
        </div>

        {errors?.other && <small className="error">{errors?.other}</small>}
        <button disabled={auth.loading} type="submit">
          {auth.loading ? <Spinner /> : "Send"}
        </button>
      </form>
    </section>
  );
};

ForgetPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  forgetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { forgetPassword })(ForgetPassword);

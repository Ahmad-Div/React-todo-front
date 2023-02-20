import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Spinner } from "@chakra-ui/react";

const Login = ({ login, auth, errors }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [{ email, password }, setInputs] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onKeyPressed = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    login({ email, password, navigate });
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated]);

  return (
    <section className="login flex flex-column justify-center align-center gap-1 position-relative">
      <div className="ball coloredBall big position-absolute"></div>
      <div className="ball blackBall small position-absolute"></div>
      <h1 className="headers">
        Sign in <span>.</span>
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
            onChange={onChange}
            onKeyDown={onKeyPressed}
            value={email}
            placeholder="Email or Username"
            type="text"
            name="email"
            id="email"
          />{" "}
        </div>
        <div className="inputDiv w-100 position-relative flex flex-column justify-center align-center">
          <div className="input flex flex-row justify-between align-center gap-1">
            <input
              onChange={onChange}
              onKeyDown={onKeyPressed}
              value={password}
              placeholder="password"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
            />
            {showPassword ? (
              <i onClick={() => setShowPassword(false)} className="fa-solid fa-eye"></i>
            ) : (
              <i onClick={() => setShowPassword(true)} className="fa-solid fa-eye-slash"></i>
            )}
          </div>
        </div>
        {errors?.other && <small className="error">{errors?.other}</small>}
        <button disabled={auth.loading} type="submit">
          {auth.loading ? <Spinner /> : "Login"}
        </button>
        <div className="linkDiv">
          don't have an account? &nbsp;&nbsp;
          <Link className="link" to="/auth/register">
            Register
          </Link>
        </div>
        <Link className="link" to="/auth/password">
          Forget Password?
        </Link>
      </form>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { login })(Login);

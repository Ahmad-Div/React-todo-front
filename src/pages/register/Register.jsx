import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { Spinner } from "@chakra-ui/react";

const Register = ({ register, auth, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [{ name, username, email, password }, setInputs] = useState({
    name: "",
    username: "",
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
    register({ name, username, email, password });
  };

  useEffect(() => {
    if (errors === null && auth.isRegistered) {
      return navigate("/auth/login");
    }
    if (auth.isAuthenticated) {
      return navigate("/");
    }
  }, [errors, auth.isRegistered, auth.isAuthenticated]);

  return (
    <section className="register flex flex-column justify-center align-center gap-1 position-relative">
      <div className="ball coloredBall big position-absolute"></div>
      <div className="ball blackBall small position-absolute"></div>

      <h1 className="headers">
        Sign up <span>.</span>
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="registerBox flex flex-column justify-center align-center gap-1"
      >
        <div className="inputDiv w-100 position-relative flex flex-column justify-center align-center">
          <input value={name} onChange={onChange} onKeyDown={onKeyPressed} placeholder="name" type="text" name="name" id="name" />

          {errors?.name && <small className="error">{errors?.name}</small>}
        </div>

        <div className="inputDiv w-100 position-relative flex flex-column justify-center align-center">
          {" "}
          <input
            value={username}
            onChange={onChange}
            onKeyDown={onKeyPressed}
            placeholder="username"
            type="text"
            name="username"
            id="username"
          />
          {errors?.username && <small className="error">{errors?.username}</small>}
        </div>

        <div className="inputDiv w-100 position-relative flex flex-column justify-center align-center">
          {" "}
          <input value={email} onChange={onChange} onKeyDown={onKeyPressed} placeholder="email" type="email" name="email" id="email" />
          {errors?.email && <small className="error">{errors?.email}</small>}
        </div>

        <div className="inputDiv w-100 position-relative flex flex-column justify-center align-center">
          <div className="input flex flex-row justify-between align-center gap-1">
            <input
              value={password}
              onChange={onChange}
              onKeyDown={onKeyPressed}
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
          {errors?.password && <small className="error">{errors?.password}</small>}
        </div>

        {errors?.other && <small className="error">{errors?.other}</small>}
        <button disabled={auth.loading} type="submit">
          {auth.loading ? <Spinner /> : "Sign up"}
        </button>

        <div className="linkDiv">
          already have an account? &nbsp;&nbsp;
          <Link className="link" to="/auth/login">
            Sing in
          </Link>
        </div>
      </form>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  register,
})(Register);

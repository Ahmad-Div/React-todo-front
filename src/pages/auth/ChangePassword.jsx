import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { changePassword } from "../../actions/auth";
import { Spinner } from "@chakra-ui/react";

const ChangePassword = ({ changePassword, auth, errors }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState("");

  const onSubmit = () => {
    changePassword(input, navigate);
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
        Change Password <span></span>
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="loginBox flex flex-column justify-center align-center gap-1"
      >
        <div className="inputDiv w-100 position-relative flex flex-column justify-center align-center">
          <div className="input flex flex-row justify-between align-center gap-1">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "13" && !e.shiftKey) {
                  onSubmit();
                }
              }}
              value={input}
              placeholder="new password"
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
          {auth.loading ? <Spinner /> : "Change"}
        </button>
      </form>
    </section>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);

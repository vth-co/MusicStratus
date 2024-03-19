import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const credential = "Demo-lition";
    const password = "password";

    const data = await dispatch(sessionActions.login({ credential, password }));
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to="/discover" />;
  }

  return (
    <>
      <div className="auth-background">
        <div className="user-login-container">
          <Link className="form-icon-link" to="/">
            <img className="form-icon" src="../../../images/icon.png"></img>
            <h2>MusicStratus</h2>
          </Link>
          <form onSubmit={handleSubmit}>
            <h3 className="form-title">Log in to MusicStratus</h3>
            <div className="errors-container">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </div>
            {/* <label>
          Email
          </label> */}
            <div className="form-inputs-container">
              <div className="field">
                <input
                  type="text"
                  placeholder="Email"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="user-form-submit" type="submit">
                  Log In
                </button>
              </div>
              <div className="demo-label">
                <p>
                  Don't have an account?
                  <Link to={"/signup"}>
                    <button type="button" className="demo-button">
                      Sign Up for MusicStratus
                    </button>
                  </Link>
                </p>
                <p>
                  Not ready to commit?
                  <button
                    type="button"
                    className="demo-button"
                    onClick={handleClick}
                  >
                    Demo
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

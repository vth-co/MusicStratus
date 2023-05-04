import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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

    const credential = 'Demo-lition'
    const password = 'password'

    const data = await dispatch(
      sessionActions.login({ credential, password })
    );
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="form-container">
      <div className="user-login-container">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">Welcome back!</h3>
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
              <button className="user-form-button" type="submit">
                Login
              </button>
            <p>
              Not ready to commit?
              <button
                type="button"
                className="sign-up-button"
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
  );
}

export default LoginForm;

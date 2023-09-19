import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import "./SignupForm.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/discover" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
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

  return (
    <>
      <div className="user-create-form-container">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">Create Account</h3>
          <div className="errors-container">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </div>
          <div className="form-inputs-container">
            <div className="field">
              <div className="label">
                <label>Email</label>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <div className="label">
                <label>Username</label>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <div className="label">
                <label>Password</label>
              </div>
              <input
                type="password"
                // placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <div className="label">
                <label>Confirm Password</label>
              </div>
              <input
                type="password"
                // placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="submit-container">
              <button className="user-create-form-submit" type="submit">
                Create Account
              </button>
            </div>
            <div className="demo-label">
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
    </>
  );
};

export default SignupForm;

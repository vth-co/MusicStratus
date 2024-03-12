import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createUser, login } from "../../../store/session";
import "./SignupForm.css";

const SignupForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [image, setImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (user) return <Redirect to="/discover" />;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     setErrors([]);
  //     return dispatch(
  //       sessionActions.signup({ email, username, password })
  //     ).catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     });
  //   }
  //   return setErrors([
  //     "Confirm Password field must be the same as the Password field",
  //   ]);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    dispatch(createUser({ username, email, password }))
      .then(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        // setImage(null);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
      });
  };

  // const updateFile = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setImage(file);
  //       setImagePreview(reader.result);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();

    const credential = "Demo-lition";
    const password = "password";

    const data = await dispatch(login({ credential, password }));
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
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="field">
              <input type="file" onChange={updateFile} />
            </div> */}
            {/* {imagePreview && (
              <div className="image-preview-container">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="image-preview"
                />
              </div>
            )} */}
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
        <button className="exit" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="svg-container"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SignupForm;

import React, { useState } from "react";
import "./Login.css";
import { LoginFunc } from "../../services/loginService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const x = LoginFunc(email, password);
    console.log(x);
    Navigate("/students");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            data-test="email"
            type="text"
            id="username"
            value={email}
            onChange={handleUsernameChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            data-test="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          data-test="login-button"
          className="btn btn-primary"
        >
          Submit
        </button>
        <button
          className="btn btn-primary"
          onClick={() => window.location.replace("/registerAlumni")}
        >
          Register Alumni
        </button>
      </form>
    </>
  );
};

export default Login;

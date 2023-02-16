import React from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "./authActions";

import { Link } from "react-router-dom";

export default function DemoLoginCard(props) {
  const dispatch = useDispatch();

  const autoLogin = {
    username: "demo@mail.com",
    password: "12345",
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin(autoLogin));
  }

  return (
    <div className="row">
      <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
      <div className="col-lg-6">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
          </div>
          <form className="user" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                readOnly
                className="form-control form-control-user"
                type="text"
                id="username"
                name="username"
                value={autoLogin.username}
              >
              </input>
            </div>
            <div className="form-group">
              <input
                readOnly
                className="form-control form-control-user"
                required
                type="password"
                id="password"
                name="password"
                value={autoLogin.password}
              >
              </input>
            </div>
            <div className="text-center mb-5">
              <button
                type="submit"
                className="w-100 btn btn-primary btn-user btn-block"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <div>Don't have an account?</div>
            <Link
              to="/app"
              className="small"
              onClick={() => {
                props.resetForm();
                props.setIsSignUp(!props.isSignUp);
              }}
            >
              {props.loading ? "Loading..." : "Sign Up"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

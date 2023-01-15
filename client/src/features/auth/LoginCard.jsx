import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../../features/auth/authActions";
import { Link } from "react-router-dom";

const LoginCard = (props) => {
  return (
    <div className="row">
      <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
      <div className="col-lg-6">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
          </div>
          <form className="user" onSubmit={props.handleSubmit}>
            <div className="form-group">
              <input
                className="form-control form-control-user"
                type="text"
                id="username"
                name="username"
                value={props.data.username}
                onChange={props.handleChange}
                placeholder="Username"
              ></input>
            </div>
            <div className="form-group">
              <input
                className="form-control form-control-user"
                required
                type="password"
                id="password"
                name="password"
                value={props.data.password}
                onChange={props.handleChange}
                placeholder="Password"
              ></input>
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
};

export default LoginCard;

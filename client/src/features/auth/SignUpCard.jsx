import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../../features/auth/authActions";
import { logout } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

const SignUpCard = (props) => {
  return (
    <div className="row">
      <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
      <div className="col-lg-7">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
          </div>
          <form className="user" onSubmit={props.handleSubmit}>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="text"
                  name="firstname"
                  className="form-control form-control-user"
                  id="exampleFirstName"
                  placeholder="First Name"
                  onChange={props.handleChange}
                ></input>
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  name="lastname"
                  className="form-control form-control-user"
                  id="exampleLastName"
                  placeholder="Last Name"
                  onChange={props.handleChange}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="username"
                className="form-control form-control-user"
                id="exampleInputEmail"
                placeholder="Email Address"
                onChange={props.handleChange}
              ></input>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-user"
                  id="exampleInputPassword"
                  placeholder="Password"
                  onChange={props.handleChange}
                ></input>
              </div>
              <div className="col-sm-6">
                <input
                  type="password"
                  name="confirmpass"
                  className="form-control form-control-user"
                  id="exampleRepeatPassword"
                  placeholder="Repeat Password"
                  onChange={props.handleChange}
                ></input>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-100 btn btn-primary btn-user btn-block"
              >
                {props.loading ? "Loading..." : "Register Account"}
              </button>
            </div>
            <hr />
          </form>
          <div className="text-center">
            <a href="#" className="small">
              Forgot Password?
            </a>
          </div>
          <div className="text-center">
            <Link
              className="small"
              onClick={() => {
                props.resetForm();
                props.setIsSignUp(!props.isSignUp);
              }}
            >
              Already have an account? Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;

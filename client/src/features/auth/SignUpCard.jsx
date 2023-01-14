import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../../features/auth/authActions";
import { logout } from "../../features/auth/authSlice";

const SignUpCard = (props) => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(registerUser(data))
        : setConfirmPass(false);
    } else {
      dispatch(userLogin(data));
    }
  }
  function resetForm() {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  }
  return (
    <div className="row">
      <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
      <div className="col-lg-7">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
          </div>
          <form className="user">
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="exampleFirstName"
                  placeholder="First Name"
                  value={data.firstname}
                  onChange={handleChange}
                >
                </input>
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="exampleLastName"
                  placeholder="Last Name"
                  value={data.lastname}
                  onChange={handleChange}
                >
                </input>
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-user"
                id="exampleInputEmail"
                placeholder="Email Address"
              >
              </input>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="password"
                  className="form-control form-control-user"
                  id="exampleInputPassword"
                  placeholder="Password"
                >
                </input>
              </div>
              <div className="col-sm-6">
                <input
                  type="password"
                  className="form-control form-control-user"
                  id="exampleRepeatPassword"
                  placeholder="Repeat Password"
                >
                </input>
              </div>
            </div>
            <div>
              <a className="w-100 btn btn-primary btn-user btn-block">
                Register Account
              </a>
            </div>
            <hr />
          </form>
          <div className="text-center">
            <a className="small">
              Forgot Password?
            </a>
          </div>
          <div className="text-center">
            <a className="small" onClick={() => props.signUpHandle(false)}>
              Already have an account? Login!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;

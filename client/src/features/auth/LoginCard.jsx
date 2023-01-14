import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../../features/auth/authActions";

const LoginCard = (props) => {
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
      <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
      <div className="col-lg-6">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
          </div>
          <form className="user" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control form-control-user"
                type="text"
                id="username"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="Username"
              >
              </input>
            </div>
            <div className="form-group">
              <input
                className="form-control form-control-user"
                required
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
              >
              </input>
            </div>
            <div className="text-center mb-5">
              <button className="w-100 btn btn-primary btn-user btn-block">
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <div>Don't have an account?</div>
            <a
              className="small"
              onClick={() => props.signUpHandle(true)}
            >
              Signup now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../../features/auth/authActions";
import { logout } from "../../features/auth/authSlice";
import LoginCard from "./LoginCard";
import SignUpCard from "./SignUpCard";

export default function Auth() {
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
  console.log(isSignUp)

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
  const backGroundStyle = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#4e73df",
    backgroundImage: "linear-gradient(180deg, #4e73df 10%, #224abe 100%)",
    backgroundSize: "cover",
  };

  return (
    <>
      <div className="wrapper" style={backGroundStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {isSignUp ? (
                    <SignUpCard
                      data={data}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      resetForm={resetForm}
                      isSignUp={isSignUp}
                      setIsSignUp={setIsSignUp}
                      loading={loading}
                    />
                  ) : (
                    <LoginCard
                      data={data}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      resetForm={resetForm}
                      isSignUp={isSignUp}
                      setIsSignUp={setIsSignUp}
                      loading={loading}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

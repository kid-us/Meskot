import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../accounts.css";
import { logo2, signUp } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    const login = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("https://meskot.pythonanywhere.com/auth/jwt/create/meskot/", login, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.access);
        navigate("/");
      })
      .catch((error) => {
        setLoginError(true);
        console.error(error);
      });
  };

  return (
    <>
      <div className="login-page px-1">
        <div className="container fw-semibold py-5 pb-4 px-lg-5">
          <div className="ms-lg-5 mb-lg-5 mb-4">
            <img src={logo2} alt="logo" width={"40px"} />
            <span className="ms-3 fs-4">Meskot</span>
          </div>
          <div className="row justify-content-center shadow-lg rounded bg-white mx-lg-5 px-1">
            <div className="col-lg-6 col-6 col-12 px-lg-5 py-4">
              <p className="fs-3 travelers-text">Sign Up</p>
              <p className="fs-5 mt-4">Welcome back!</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                {loginError && (
                  <p className="bg-danger small text-center p-1 rounded text-light">
                    Invalid Email and Password!
                  </p>
                )}
                <label htmlFor="email" className="mt-3 small mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control border rounded border-info mb-3 fs-6 fw-semibold py-2 ${
                    errors.email && "border border-danger border-2"
                  }`}
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <p role="alert" className="small-text ms-1">
                    Valid email required!
                  </p>
                )}
                <label htmlFor="password" className="small mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control border rounded border-info mb-3 fs-6 fw-semibold py-2 ${
                    errors.email && "border border-danger border-2"
                  }`}
                  {...register("password", {
                    required: true,
                  })}
                />

                {errors.password && (
                  <p role="alert" className="small-text ms-1">
                    Password required!
                  </p>
                )}
                <p className="text-end small my-4">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </p>
                <button className="buyers-bg text-light btns w-100 px-1 py-2 fw-semibold mb-lg-4 mt-1">
                  Sign In
                </button>
                <p className="small pt-lg-0 pt-3">
                  Don't have an account?
                  <Link to={"/sign-up-buyers"}>Sign Up</Link>
                </p>
              </form>
            </div>
            <div className="col-6 p-0 d-md-block d-none">
              <img
                src={signUp}
                className="account-img rounded"
                alt="sign up img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

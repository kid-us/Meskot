import React, { useState, useEffect } from "react";
import "../../accounts.css";
import { useForm } from "react-hook-form";
import { logo2 } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const NewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [uid, setUid] = useState();
  const [loadBtn, setLoadBtn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get("token"));
    setUid(searchParams.get("uid"));
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data) => {
    const newPassword = {
      token: token,
      uid: uid,
      new_password: data.password,
    };

    setLoadBtn(true);
    axios
      .post(
        "https://meskot.pythonanywhere.com/auth/users/reset_password_confirm/",
        newPassword,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        notify("Password reset successfully done");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        setLoadBtn(false);
        setErrorMsg(true);
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer theme="dark" className={"mt-5"} />
      <div className="login-page">
        <div className="forgot-password-container fw-semibold mt-5 pt-5">
          <div className="mb-lg-5 mb-4">
            <img src={logo2} alt="logo" width={"40px"} />
            <span className="ms-3 fs-4">Meskot</span>
          </div>
          {errorMsg && (
            <p className="bg-danger text-white p-2 rounded text-center">
              Something is wrong try again!
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded p-3"
          >
            <p className="fs-4 text-center mt-4">Create Password</p>
            <label htmlFor="email" className="mt-3 small mb-1">
              New Password
            </label>
            <input
              type="password"
              className={`form-control border rounded border-info mb-3 fs-6 fw-semibold py-2 ${
                errors.password && "border border-danger border-2"
              }`}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[ -\/:-@\[-\`{-~]).{6,40}$/,
              })}
            />
            {errors.password && (
              <p role="alert" className="password-small-text ms-1">
                Password must be more than 6 chars must include 1 uppercase, 1
                number and 1 special characters.
              </p>
            )}

            {loadBtn ? (
              <p className="buyers-bg text-light text-center btns w-100 px-1 py-3 fw-semibold mb-lg-4 mt-3">
                <span className="spinner-border me-4 p-0 "></span>
              </p>
            ) : (
              <button className="buyers-bg text-light btns w-100 px-1 py-3 fw-semibold mb-lg-4 mt-3">
                Reset Password
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;

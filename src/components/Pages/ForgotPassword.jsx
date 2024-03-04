import React, { useState } from "react";
import "../../accounts.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { logo2 } from "../../assets";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [invalidEmailMsg, setInvalidEmailMsg] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => {
    const email = {
      email: data.email,
    };

    axios
      .post(
        "https://meskot.pythonanywhere.com/auth/users/reset_password/",
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/new-password");
      })
      .catch((error) => {
        console.log(error);
        setInvalidEmailMsg(true);
      });
  };

  return (
    <>
      <div className="login-page">
        <div className="forgot-password-container fw-semibold mt-5 pt-5">
          <div className="mb-lg-5 mb-4">
            <img src={logo2} alt="logo" width={"40px"} />
            <span className="ms-3 fs-4">Meskot</span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded p-3"
          >
            <p className="fs-4 text-center mt-4">Reset password</p>
            {invalidEmailMsg && (
              <p className="bg-danger small text-center p-1 rounded text-light">
                Invalid User
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

            <button className="buyers-bg text-light btns w-100 px-1 py-3 fw-semibold mb-lg-4 mt-3">
              Send Recovery Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

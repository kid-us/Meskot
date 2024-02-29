import React, { useState, useEffect } from "react";
import Navbar from "../NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Footer from "../Footer";
import Select from "react-select";
import { useAuth } from "../../context/Auth";
import Loading from "../Loading/Loading";
import axios from "axios";
import { request } from "../../constant/request";

const Profile = () => {
  const { auth } = useAuth();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  // Country
  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
        setLoading(false);
      });
  }, []);

  // Use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      dob: "",
    },
  });

  // Form Submit
  const onSubmit = (data) => {
    const profile = {
      name: data.username && data.username,
      password: data.password && data.password,
      birthdate: data.dob & data.dob,
      country: selectedCountry.value,
    };

    // Validate password if provided
    if (profile.password) {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[ -\/:-@\[-\`{-~]).{6,40}$/;

      if (
        !passwordRegex.test(profile.password) ||
        profile.password.length > 6
      ) {
        const validationMessage = [
          "Password must contain at least one uppercase letter (A-Z),",
          "one digit (0-9),",
          "and one special character (e.g., !@#$%^&*).",
          "It must be between 6 and 40 characters long.",
        ].join("\n");

        setPasswordError(validationMessage);
        return;
      }
    }

    const profileToSend = Object.fromEntries(
      Object.entries(profile).filter(
        ([key, value]) => value !== undefined && value !== "" && value !== 0
      )
    );

    if (Object.keys(profileToSend).length > 0) {
      // console.log(profileToSend);
      axios
        .patch(`${request.baseUrl}auth/update/${auth.id}/`, profileToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          notify("Profile changed Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      {loading && <Loading></Loading>}
      <Navbar></Navbar>

      <ToastContainer theme="dark" className="mt-5" />

      <div className="container my-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-10 col-12 bg-white shadow fw-semibold p-5 rounded">
            <p className="fs-5">Make a change on your account!</p>
            <p>
              " You can't change your Phone Number and Email address but you can
              the other fields! "
            </p>
            <form
              encType="multipart/form-data"
              className="rounded mt-4 px-lg- "
              onSubmit={handleSubmit(onSubmit)}
            >
              <label
                className="ms-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Country
              </label>
              <Select
                options={countries}
                value={selectedCountry}
                onChange={(selectedOption) =>
                  setSelectedCountry(selectedOption)
                }
                className={`mb-3 fs-6 fw-semibold border rounded border-info`}
              />

              <label
                htmlFor="dob"
                className="ms-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Date of Birth
              </label>
              <input
                type="date"
                className={`form-control border rounded border-info mb-2 fs-6 fw-semibold py-2 ${
                  errors.dob && "border border-danger border-2"
                }`}
                {...register("dob")}
              />

              <label
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Email
              </label>

              <input
                type="text"
                className={`form-control buyers-bg text-white border border-secondary mb-3 fs-6 fw-semibold py-2 `}
                value={auth.email}
                readOnly
              />

              <label
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Phone
              </label>

              <input
                type="text"
                className={`form-control buyers-bg text-white border border-secondary mb-3 fs-6 fw-semibold py-2 `}
                value={auth.phone}
                readOnly
              />

              <label
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Username
              </label>

              <input
                type="text"
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.username && "border border-danger border-2"
                }`}
                {...register("username")}
              />

              <label
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Password
              </label>

              <input
                type="password"
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.password && "border border-danger border-2"
                }`}
                {...register("password")}
              />
              {passwordError !== "" && (
                <p role="alert" className="password-small-text ms-1">
                  {passwordError}
                </p>
              )}

              <button className="buyers-bg text-light btns w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../accounts.css";
import { signUp, logo2 } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { PhoneNumberUtil } from "google-libphonenumber";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import axios from "axios";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};
const SignUpBuyers = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState(false);

  const isValid = isPhoneValid(phone);

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      dob: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data) => {
    const buyer = {
      User_Type: "buyer",
      birthdate: data.dob,
      name: data.name,
      phone: phone,
      password: data.password,
      country: selectedCountry.value,
      email: data.email,
    };
    if (data.password !== data.confirm_password) {
      setPasswordError(true);
      return;
    }
    if (!isValid) {
      setPhoneError(true);
      return;
    }
    if (isValid) {
      axios
        .post("http://meskot.pythonanywhere.com/auth/users/", buyer, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.email) {
            setEmailErrorMsg(true);
          }
          if (error.response.data.phone) {
            setPhoneErrorMsg(true);
          }
        });
    }
  };

  return (
    <>
      <div className="buyer-page px-1">
        <div className="container fw-semibold py-4 pb-4">
          <div className="ms-lg-5 mb-lg-5 mb-4">
            <img src={logo2} alt="logo" width={"40px"} />
            <span className="ms-3 fs-4">Meskot</span>
          </div>
          <div className="row justify-content-center shadow-lg rounded bg-white mx-lg-5 px-1">
            <div className="col-lg-6 col-6 col-12 px-lg-5 py-4">
              <p className="fs-3 px-lg-4 travelers-text">Sign Up</p>
              <p className="fs-5 px-lg-4">
                Create your Meskot Buyer account now!
              </p>
              <form
                className="rounded mt-4 px-lg-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className={`form-control border rounded border-info mb-3 fs-6 fw-semibold py-2 ${
                    errors.name && "border border-danger border-2"
                  }`}
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                {errors.name && (
                  <p role="alert" className="small-text ms-1">
                    First name is required and must greater than 3 chars.
                  </p>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className={`form-control rounded border border-info  mb-2 fs-6 fw-semibold py-2 ${
                    errors.email && "border border-danger border-2"
                  }`}
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <p role="alert" className="small-text ms-1">
                    Valid email address required.
                  </p>
                )}
                {emailErrorMsg && (
                  <p role="alert" className="small-text ms-1">
                    Email address already exist!
                  </p>
                )}
                <label
                  className="ms-1 text-secondary"
                  style={{ fontSize: "small" }}
                >
                  Phone
                </label>
                <div className="mb-3 border border-info rounded">
                  <PhoneInput
                    defaultCountry="et"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                  />
                </div>

                {phoneError && <p className="small-text">Phone is not valid</p>}
                {phoneErrorMsg && (
                  <p role="alert" className="small-text ms-1">
                    Phone number already exist!
                  </p>
                )}

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
                  {...register("dob", {
                    required: true,
                  })}
                />
                {errors.dob && (
                  <p role="alert" className="small-text ms-1">
                    Date of birth required.
                  </p>
                )}
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

                <input
                  type="password"
                  placeholder="Password"
                  className={`form-control border rounded border-info mb-2 fs-6 fw-semibold py-2 ${
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
                    Password must be more than 6 chars must include 1 uppercase,
                    1 number and 1 special characters.
                  </p>
                )}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`form-control border rounded border-info mb-3 fs-6 fw-semibold py-2 ${
                    errors.confirm_password && "border border-danger border-2"
                  }`}
                  {...register("confirm_password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors.confirm_password && (
                  <p role="alert" className="small-text ms-1">
                    Confirm password
                  </p>
                )}

                {passwordError && (
                  <p role="alert" className="small-text ms-1">
                    Password not match!
                  </p>
                )}
                <button className="buyers-bg text-light btns w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4">
                  Sign Up
                </button>
                <p className="small pt-lg-0 pt-3">
                  Already have an account? <Link to={"/login"}>Sign In</Link>
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

export default SignUpBuyers;

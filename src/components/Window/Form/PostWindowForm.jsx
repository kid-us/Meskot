import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { useAuth } from "../../../context/Auth";
import { request } from "../../../constant/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostWindowForm = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };
  const [uploadImage, setUploadImage] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [loadButton, setLoadButton] = useState(false);

  // Country
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

  // Image
  const handleImage = (event) => {
    setUploadImage(event.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      arrival_date: "",
    },
  });

  const onSubmit = (data) => {
    const postWindow = {
      arrival_date: data.arrival_date,
      country: selectedCountry.value,
      user_id: auth.id,
      traveller_name: auth.name,
    };

    const formData = new FormData();

    if (uploadImage === undefined) {
      setUploadImage(null);
      return;
    } else if (uploadImage !== "" && uploadImage !== null) {
      formData.append("upload_img", uploadImage);
      Object.entries(postWindow).forEach(([key, value]) => {
        formData.append(key, value);
      });

      setLoadButton(true);
      axios
        .post(`${request.baseUrl}api/window`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          notify("Window Posted Successfully!");
          setTimeout(() => {
            navigate("/window");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <ToastContainer theme="dark" className={"mt-5"} />
      <div className="px-1">
        <div className="container fw-semibold py-4 pb-4">
          <div className="row justify-content-center shadow-lg rounded bg-white mx-lg-5 px-1">
            <div className="col-lg-6 col-6 col-12 px-lg-5 py-4">
              <p className="fs-3 px-lg-4 travelers-text">Post your Orders</p>
              <form
                className="rounded mt-4 px-lg-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label
                  htmlFor="arrival_date"
                  className="ms-1 text-secondary"
                  style={{ fontSize: "small" }}
                >
                  Arrival Date
                </label>
                <input
                  type="date"
                  className={`form-control border rounded border-warning mb-3 fs-6 fw-semibold py-2 ${
                    errors.arrival_date && "border border-danger border-2"
                  }`}
                  {...register("arrival_date", {
                    required: true,
                  })}
                />
                {errors.arrival_date && (
                  <p role="alert" className="small-text ms-1">
                    Arrival Date Required.
                  </p>
                )}

                <label
                  className="ms-1 mb-1 text-secondary"
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
                  className={`mb-3 fs-6 fw-semibold border rounded border-warning`}
                />

                <label
                  htmlFor="image"
                  className="ms-1 mb-1 text-secondary small"
                >
                  Image
                </label>
                <input
                  type="file"
                  onChange={handleImage}
                  className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                    uploadImage === null && "border border-danger border-2"
                  }`}
                />
                {uploadImage === null && (
                  <p role="alert" className="small-text ms-1">
                    Image is required.
                  </p>
                )}

                {loadButton ? (
                  <p className="travelers-bg text-light btns text-center w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4">
                    <span className="spinner-border me-4 p-0 "></span>
                  </p>
                ) : (
                  <button className="travelers-bg text-light btns w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4">
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostWindowForm;

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { request } from "../../constant/request";
import "../../modals.css";
import { useAuth } from "../../context/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditForm = ({ editData, closeEditModal }) => {
  const { auth } = useAuth();
  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };
  const [type, setType] = useState("shoes");
  const [quantity, setQuantity] = useState(3);
  const [size, setSize] = useState("very-small");
  const [uploadImage, setUploadImage] = useState();
  const [objName, setObjName] = useState();
  const [descriptionError, setDescriptionError] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [loadBtn, setLoadBtn] = useState(false);

  // Image
  const handleImage = (event) => {
    setUploadImage(event.target.files[0]);
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
      });
  }, []);

  // Quantity
  useEffect(() => {
    if (type === "shoes" || type === "perfume") {
      setQuantity(3);
    } else if (type === "phone" || type === "drink") {
      setQuantity(2);
    } else if (
      type === "laptop" ||
      type === "camera" ||
      type === "watch" ||
      type === "beard-hair"
    ) {
      setQuantity(1);
    } else if (type === "cigarette") {
      setQuantity(20);
    } else {
      setQuantity(1000);
    }
  }, [type]);

  // Use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      weight: "",
      description: "",
      quantity: "",
      url: "",
    },
  });

  // Form Submit
  const onSubmit = (data) => {
    const postOrder = {
      country: selectedCountry.value,
      object_name: data.name,
      url: data.url,
      price: data.price,
      quantity: data.quantity,
      approx_weight: data.weight,
      object_type: type,
      size: size,
      Description: data.description,
      user_id: auth.id,
    };

    const formData = new FormData();
    if (uploadImage === undefined) {
      setUploadImage(null);
    } else if (uploadImage !== "" && uploadImage !== null) {
      formData.append("upload_img", uploadImage);
      Object.entries(postOrder).forEach(([key, value]) => {
        formData.append(key, value);
      });

      setLoadBtn(true);
      axios
        .patch(`${request.baseUrl}api/order/${editData.order_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          notify("Order Edited Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          setLoadBtn(true);
          console.log(error);
        });
    }
  };

  return (
    <>
      <ToastContainer theme="dark" className={"mt-5"} />
      <div className="overlay"></div>

      <div className="modals px-5">
        <p className="text-end pt-2">
          <span
            onClick={() => closeEditModal()}
            className="bi-x-lg fs-5 text-black me-4 cursor"
          ></span>
        </p>
        <p className="fs-5 mb-4">Edit your Posted Order</p>
        <form
          encType="multipart/form-data"
          className="rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-lg-4 col-md-4 col-12">
              <label
                htmlFor="name"
                className="ms-1 text-start mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Object Name
              </label>
              <input
                type="text"
                placeholder={editData.object_name}
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.name && "border border-danger border-2"
                }`}
                {...register("name", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors.url && (
                <p
                  role="alert"
                  className="ms-1"
                  style={{
                    lineHeight: "13px",
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  Object name required and Name must be greater than 2 chars.
                </p>
              )}
            </div>

            <div className="col-lg-4 col-md-4 col-12">
              <label
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Country {editData.country && ` / Prev: ${editData.country}`}
              </label>
              <Select
                options={countries}
                value={selectedCountry}
                onChange={(selectedOption) =>
                  setSelectedCountry(selectedOption)
                }
                className={`mb-3 fs-6 fw-semibold border rounded border-warning`}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label
                htmlFor="url"
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                URL
              </label>
              <input
                type="url"
                placeholder={editData.url}
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.url && "border border-danger border-2"
                }`}
                {...register("url", {
                  required: true,
                })}
              />
              {errors.url && (
                <p role="alert" className="small-text ms-1">
                  URL required.
                </p>
              )}
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label
                htmlFor="price"
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Price
              </label>
              <input
                type="number"
                min="1"
                placeholder={editData.price}
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.price && "border border-danger border-2"
                }`}
                {...register("price", {
                  required: true,
                })}
              />
              {errors.price && (
                <p role="alert" className="small-text ms-1">
                  Price required.
                </p>
              )}
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label
                htmlFor="weight"
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Weight Kg
              </label>
              <input
                type="number"
                min="1"
                placeholder={editData.approx_weight}
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.weight && "border border-danger border-2"
                }`}
                {...register("weight", {
                  required: true,
                })}
              />
              {errors.weight && (
                <p role="alert" className="small-text ms-1">
                  Weight in kg required.
                </p>
              )}
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label htmlFor="size" className="ms-1 mb-1 text-secondary small">
                Size{editData.size && ` / Prev: ${editData.size}`}
              </label>
              <select
                onChange={(e) => setSize(e.target.value)}
                name="size"
                className="form-select border border-secondary small mb-3"
              >
                <option value="very-small" className="text-secondary">
                  Very Small ( &lt; 5cm&sup2; )
                </option>
                <option value="small" className="text-secondary">
                  Small (5cm&sup2; - 10cm &sup2; )
                </option>
                <option value="medium" className="text-secondary">
                  Medium (10cm&sup2; - 15cm &sup2; )
                </option>
                <option value="large" className="text-secondary">
                  Large (15cm&sup2; - 20cm &sup2; )
                </option>
                <option value="very-big" className="text-secondary">
                  Very Big ( &gt; 20cm &sup2; )
                </option>
              </select>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label htmlFor="type" className="ms-1 mb-1 text-secondary small">
                Object Type
                {editData.object_type && ` / Prev: ${editData.object_type}`}
              </label>
              <select
                value={type}
                name="type"
                onChange={(e) => setType(e.target.value)}
                className="form-select border border-secondary mb-3"
              >
                <option value="shoes" className="text-secondary">
                  Shoes
                </option>
                <option value="phone" className="text-secondary">
                  Mobile Phone
                </option>
                <option value="clothes" className="text-secondary">
                  Clothes
                </option>
                <option value="cigarette" className="text-secondary">
                  Cigarette
                </option>
                <option value="laptop" className="text-secondary">
                  Laptop
                </option>
                <option value="drink" className="text-secondary">
                  Alcoholic Drink
                </option>
                <option value="perfume" className="text-secondary">
                  Perfume
                </option>
                <option value="camera" className="text-secondary">
                  Photographic Camera
                </option>
                <option value="wheelchair" className="text-secondary">
                  Wheelchair
                </option>
                <option value="watch" className="text-secondary">
                  Wrist Watch
                </option>
                <option value="beard-hair" className="text-secondary">
                  Beard/hair Shaver
                </option>
                <option value="medicines" className="text-secondary">
                  Treatment Medicines
                </option>
                <option value="other" className="text-secondary">
                  Other Items
                </option>
              </select>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label htmlFor="image" className="ms-1 mb-1 text-secondary small">
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
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label
                htmlFor="quantity"
                className="ms-1 mb-1 text-secondary small"
              >
                Quantity
              </label>
              <input
                type="number"
                min="1"
                placeholder={editData.quantity}
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.quantity && "border border-danger border-2"
                }`}
                {...register("quantity", {
                  required: true,
                  max: quantity,
                })}
              />
              {errors.quantity && (
                <p role="alert" className="small-text lh-sm ms-1">
                  Invalid input. Valid Quantities are, for # Mobile Phone &
                  Drink is 2, # Cigarette 20, # Laptop, Camera, Beard/hair
                  shaver, Wheelchair, Watch are 1, # Perfume & Shoes 3, and for
                  # Medicines and Other items there will not limit!
                </p>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <label
                htmlFor="description"
                className="ms-1 mb-1 text-secondary small"
              >
                Description
              </label>
              <textarea
                style={{ resize: "none" }}
                name="description"
                placeholder={editData.Description}
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.image && "border border-danger border-2"
                }`}
                {...register("description", {
                  required: true,
                })}
                rows="5"
              ></textarea>
              {errors.description && (
                <p role="alert" className="small-text ms-1">
                  Description is required.
                </p>
              )}
              {descriptionError !== "" && (
                <p role="alert" className="small-text ms-1">
                  {descriptionError}
                </p>
              )}
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-4 col-md-4 col-12 mt-lg-5 pt-lg-5 pb-4">
              {loadBtn ? (
                <p className="buyers-bg text-light btns text-center w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4">
                  <span className="spinner-border me-4 p-0 "></span>
                </p>
              ) : (
                <button className="buyers-bg text-light btns w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4">
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;

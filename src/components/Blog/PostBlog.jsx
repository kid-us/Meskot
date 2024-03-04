import React, { useState } from "react";
import { useAuth } from "../../context/Auth";
import { useForm } from "react-hook-form";
import Footer from "../Footer";
import { ToastContainer, toast } from "react-toastify";
import { request } from "../../constant/request";
import axios from "axios";
import NavBar from "../NavBar";
import Links from "../Admin/Links";

const PostBlog = () => {
  const { auth } = useAuth();
  const { logout } = useAuth();
  const [uploadImage, setUploadImage] = useState();
  const [descriptionError, setDescriptionError] = useState("");
  const [loadBtn, setLoadBtn] = useState(false);

  // Image
  const handleImage = (event) => {
    setUploadImage(event.target.files[0]);
  };
  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };
  // Use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
      description: "",
    },
  });

  // Form Submit
  const onSubmit = (data) => {
    const postBlog = {
      title: data.title,
      body: data.body,
      short_description: data.description,
      user_id: auth.id,
    };

    const formData = new FormData();

    if (uploadImage === undefined) {
      setUploadImage(null);
      return;
    } else if (uploadImage !== "" && uploadImage !== null) {
      formData.append("upload_img", uploadImage);
      Object.entries(postBlog).forEach(([key, value]) => {
        formData.append(key, value);
      });

      setLoadBtn(true);

      axios
        .post(`${request.baseUrl}api/blog/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          notify("Blog Posted Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          setLoadBtn(false);
          console.log(error);
          if (error.response.data.short_description) {
            setDescriptionError(
              "Ensure this field has no more than 100 characters."
            );
          }
        });
    }
  };

  return (
    <>
      <NavBar user={auth} logout={logout}></NavBar>
      <ToastContainer theme="dark" className="mt-5" />

      <div className="container mt-5 pt-4 fw-semibold mb-3">
        <Links activeAt={"post-blog"}></Links>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-6 col-md-8 col-12 bg-white  rounded  p-5">
            <p className="fs-5">Post Blogs</p>
            <form
              encType="multipart/form-data"
              className="rounded mt-4 px-lg- "
              onSubmit={handleSubmit(onSubmit)}
            >
              <label
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Title
              </label>

              <input
                type="text"
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.title && "border border-danger border-2"
                }`}
                {...register("title", {
                  required: true,
                })}
              />
              {errors.title && (
                <p role="alert" className="small-text ms-1">
                  Title required.
                </p>
              )}

              <label
                htmlFor="weight"
                className="ms-1 mb-1 text-secondary"
                style={{ fontSize: "small" }}
              >
                Body
              </label>
              <textarea
                style={{ resize: "none" }}
                name="description"
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.image && "border border-danger border-2"
                }`}
                {...register("body", {
                  required: true,
                })}
                rows="5"
              ></textarea>
              {errors.body && (
                <p role="alert" className="small-text ms-1">
                  Body is required.
                </p>
              )}

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
              <label
                htmlFor="description"
                className="ms-1 mb-1 text-secondary small"
              >
                Description
              </label>
              <textarea
                style={{ resize: "none" }}
                name="description"
                maxLength={100}
                className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                  errors.image && "border border-danger border-2"
                }`}
                {...register("description", {
                  required: true,
                })}
                rows="3"
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
              {loadBtn ? (
                <p className="buyers-bg text-light text-center btns w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4">
                  <span className="spinner-border me-4 p-0 "></span>
                </p>
              ) : (
                <button className="buyers-bg text-light btns w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PostBlog;

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { request } from "../../constant/request";
import axios from "axios";
import "../../modals.css";

const EditBlog = ({ blogId, closeBlogEdit }) => {
  const { auth } = useAuth();
  const [blog, setBlog] = useState("");

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  useEffect(() => {
    axios
      .get(`${request.baseUrl}api/blog/${blogId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [uploadImage, setUploadImage] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

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

    if (uploadImage === "") {
      setUploadImage(null);
      return;
    } else if (uploadImage !== "" && uploadImage !== null) {
      formData.append("upload_img", uploadImage);
      Object.entries(postBlog).forEach(([key, value]) => {
        formData.append(key, value);
      });

      axios
        .patch(`${request.baseUrl}api/blog/${blogId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          notify("Blog edited Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.short_description) {
            setDescriptionError(
              "Ensure this field has no more than 100 characters."
            );
          }
        });
    }
  };

  // Image
  const handleImage = (event) => {
    setUploadImage(event.target.files[0]);
  };

  return (
    <>
      {blog !== "" && (
        <>
          <ToastContainer theme="dark" className="mt-5" />
          <div className="overlay"></div>

          <div className="modals container mt-4 fw-semibold mb-3 mx-lg-5 px-lg-5">
            <p className="text-end pt-3">
              <span
                onClick={() => closeBlogEdit()}
                className="bi-x-lg fs-5 text-black me-4 cursor"
              ></span>
            </p>
            <div className="row justify-content-center">
              <div className="px-5 bg-white  rounded">
                <p className="fs-5">Post Blogs</p>
                <form
                  encType="multipart/form-data"
                  className="rounded mt- "
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
                    placeholder={blog.title}
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
                  <input
                    type="text"
                    placeholder={blog.body}
                    className={`form-control border border-secondary mb-3 fs-6 fw-semibold py-2 ${
                      errors.body && "border border-danger border-2"
                    }`}
                    {...register("body", {
                      required: true,
                    })}
                  />
                  {errors.body && (
                    <p role="alert" className="small-text ms-1">
                      Body is required.
                    </p>
                  )}

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
                    placeholder={blog.short_description}
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
                  <button className="buyers-bg text-light btns w-100 px-1 py-2 fw-semibold mb-lg-4 my-4">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditBlog;

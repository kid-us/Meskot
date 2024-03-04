import React, { useState, useEffect } from "react";
import axios from "axios";
import { request } from "../../constant/request";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/Auth";
import EditBlog from "./EditBlog";
import "../../modals.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  const [editClicked, setEditClicked] = useState(false);
  const [blogID, setBlogID] = useState("");
  const [removeClicked, setRemoveClicked] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    if (page !== null) {
      axios
        .get(`${request.baseUrl}api/blog/?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setBlogs(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/blog/`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setBlogs(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [blogs]);

  //   Pagination
  const handlePagination = (link) => {
    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    const page = searchParams.get("page");
    alert(page);
    if (page !== null) {
      axios
        .get(`${request.baseUrl}api/blog/?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setBlogs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/blog/`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setBlogs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Edit Blog
  const editBlog = (blogId) => {
    setBlogID(blogId);
    setEditClicked(true);
  };

  // Delete Btn
  const deleteBtn = (blogId) => {
    setBlogID(blogId);
    setRemoveClicked(true);
  };

  //   Remove Blog
  const removeBlog = () => {
    axios
      .delete(`${request.baseUrl}api/blog/${blogID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigate("/blog");

        setTimeout(() => {
          notify("Blog removed successfully");
        }, 2000);

        setRemoveClicked(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer theme="dark" className={"mt-5"} />
      {loading && <Loading></Loading>}
      <div>
        <div className="row justify-content-center p-lg-3 fw-semibold px-4">
          {blogs
            ? blogs.results.length > 0
              ? blogs.results.map((blog, index) => (
                  <div
                    className="col-lg-4 col-md-4 col-12 mt-3 shadow bg-white me-lg-3 rounded p-3"
                    key={index}
                  >
                    <div className="row justify-content-center">
                      <div className="col-12 text-center">
                        <img
                          src={blog.upload_img}
                          alt="blog image"
                          className="blog-img"
                        />
                      </div>
                      <div className="col-12 small mt-2">
                        <p className="font-poppins fs-5">{blog.title}</p>
                        <p>{blog.short_description}</p>
                      </div>
                      <div className="col-6">
                        <Link
                          to={`/blog/${blog.blog_id}`}
                          className="text-primary"
                        >
                          Read More
                        </Link>
                      </div>
                      <div className="col-6 text-end">
                        {auth && auth.User_Type === "ADMIN" && (
                          <>
                            <button
                              onClick={() => editBlog(blog.blog_id)}
                              className="btn bg-success bi-pen-fill text-white py-1 px-2"
                            ></button>
                            <button
                              onClick={() => deleteBtn(blog.blog_id)}
                              className="btn bg-danger ms-4 bi-x-lg text-white py-1 px-2"
                            ></button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : ""
            : ""}

          <Pagination
            comingTo={"blog"}
            onPagination={() => handlePagination()}
            data={blogs}
          ></Pagination>
        </div>
      </div>

      {editClicked && (
        <EditBlog
          blogId={blogID}
          closeBlogEdit={() => setEditClicked(false)}
        ></EditBlog>
      )}

      {removeClicked && (
        <>
          <div className="overlay"></div>
          <div className="container">
            <div className="confirm-modal">
              <p className="fw-semibold text-end pt-2">
                <span
                  onClick={() => setRemoveClicked(false)}
                  className="bi-x-lg pe-3 cursor"
                ></span>
              </p>
              <p className="text-center fw-semibold">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>

              <div className="row justify-content-center px-5 m-lg-4 m-3">
                <div className="col-lg-4 col-6">
                  <button
                    onClick={() => setRemoveClicked(false)}
                    className="btn p-1 px-4 bg-danger text-white"
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-lg-4 col-6">
                  <button
                    onClick={() => removeBlog()}
                    className="btn p-1 px-4 bg-primary text-white"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Blogs;

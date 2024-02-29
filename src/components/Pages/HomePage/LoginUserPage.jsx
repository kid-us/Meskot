import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import NavBar from "../../NavBar";
import Footer from "../../Footer";
import axios from "axios";
import { request } from "../../../constant/request";
import { Link } from "react-router-dom";
import About from "../../About/About";
import Swiper from "../../Banners/Swiper";
// import "../../../app.css";

const LoginUserPage = ({ userData }) => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <NavBar user={userData}></NavBar>

      <div className="hero-bg">
        <Hero signBtn={true}></Hero>
      </div>

      <div className="container mt-5">
        <p className="font-poppins fs-2">Our Products</p>
        <Swiper></Swiper>

        {/* <About></About> */}
        {blogs && (
          <div className="row justify-content-center my-5">
            <p className="font-poppins fs-2">Our Blogs</p>
            <div className="col-lg-6 col-md-6 col-12">
              <div
                className="shadow p-4 bg-white rounded"
                style={{ height: "490px", overflow: "auto" }}
              >
                <div className="text-center">
                  <img
                    src={blogs.results[0].upload_img}
                    width="300px"
                    alt="blog"
                  />
                </div>
                <p className="fw-semibold mt-4">
                  {blogs.results[0].short_description}
                </p>
                <Link
                  to={`/blog/${blogs.results[0].blog_id}`}
                  className="fw-semibold"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mt-lg-0 mt-md-0 mt-3">
              <div
                className="shadow p-4 bg-white rounded"
                style={{ height: "490px", overflow: "auto" }}
              >
                <div className="text-center">
                  <img
                    src={blogs.results[1].upload_img}
                    width="300px"
                    alt="blog"
                  />
                </div>
                <p className="fw-semibold mt-4">
                  {blogs.results[1].short_description}
                </p>
                <Link
                  to={`/blog/${blogs.results[1].blog_id}`}
                  className="fw-semibold"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <About></About>
      <Footer></Footer>
    </>
  );
};

export default LoginUserPage;

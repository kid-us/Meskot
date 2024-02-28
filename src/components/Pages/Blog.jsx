import React, { useState, useEffect } from "react";
import Navbar from "../NavBar";

import Footer from "../Footer";
import Blogs from "../Blog/Blogs";

const Blog = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="container-fluid my-5 pt-4">
        <p className="fs-4 fw-semibold text-center font-poppins mb-3 pt-lg-0 pt-md-0 pt-4">
          Welcome to our Blog Posts
        </p>
        <Blogs></Blogs>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Blog;

import React, { useState, useEffect } from "react";
import "../../../app.css";
import NavBar from "../../NAvBar";
import Hero from "./Hero";
import Footer from "../../Footer";
// import Blog from "./Blog";
// import About from "./About";

const NotLoginUser = () => {
  return (
    <>
      <NavBar></NavBar>

      <div className="hero-bg">
        <Hero signBtn={false}></Hero>
      </div>
      <div className="container-fluid">
        {/* <About></About> */}
        {/* <Blog></Blog> */}
      </div>
      <Footer></Footer>
    </>
  );
};

export default NotLoginUser;

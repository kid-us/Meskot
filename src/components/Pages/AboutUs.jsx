import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import About from "../About/About";
import { about } from "../../assets";
const AboutUs = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="container mt-5 pt-5">
        <img src={about} alt="image" className="w-100 rounded" />
      </div>
      <p className="fs-3 font-poppins text-center mt-5">About Us</p>
      <About></About>
      <Footer></Footer>
    </>
  );
};

export default AboutUs;

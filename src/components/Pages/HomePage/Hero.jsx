import React from "react";
import { Link } from "react-router-dom";
import { hero } from "../../../assets";
const Hero = ({ signBtn }) => {
  return (
    <div className="container-fluid p-lg-5">
      <div className="row justify-content-center px-lg-4">
        <div className="col-lg-6 col-md-6 col-12 mt-5 pt-lg-4">
          <h1 className="fw-semibold display-4 py-lg-0 py-md-0 py-4">
            Launch or Scale your affiliate business
          </h1>
          <p className="mt-4 font-poppins py-4">
            Tired of limited options? Meskot is your window to the world,
            offering anything from anywhere at unbeatable prices and top
            quality. Unlike traditional shopping, we connect you directly with
            travelers bringing back your desired items. Simply sign up, post
            your order, and relax! Our secure platform facilitates the entire
            process, ensuring both buyer and traveler satisfaction.
          </p>
          {!signBtn && (
            <div className="row mt-5">
              <div className="col-lg-4 col-md-6 col-12">
                <Link to={"/sign-up-buyers"}>
                  <p className="buyers-bg font-poppins nav-btn fs-5 text-light text-center">
                    Sign In Buyers
                  </p>
                </Link>
              </div>

              <div className="col-lg-6 col-md-6 -col-12">
                <Link to={"/sign-up-travellers"}>
                  <p className="travelers-bg font-poppins nav-btn fs-5 text-light text-center">
                    Sign In Traveler
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-5 col-md-6 col-12">
          <img src={hero} alt="Hero img" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

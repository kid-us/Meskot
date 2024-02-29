import React from "react";
import { Link } from "react-router-dom";
import { hero } from "../../../assets";
const Hero = ({ signBtn }) => {
  return (
    <div className="container-fluid p-lg-5">
      <div className="row justify-content-center px-lg-4">
        <div className="col-lg-6 col-md-6 col-12 mt-5 pt-lg-4">
          <h1 className="fw-semibold display-4">
            Launch or Scale your affiliate business
          </h1>
          <p className="mt-4 font-poppins py-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            esse, fugit accusantium temporibus, dolorem eveniet deleniti modi
            inventore porro, quibusdam atque officia soluta voluptatibus
            accusamus. Cupiditate ipsa aliquid pariatur molestiae?
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

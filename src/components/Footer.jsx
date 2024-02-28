import React from "react";
import { logo } from "../assets";
import SocialMedia from "./Footer/SocialMedia";
import FooterLinks from "./Footer/FooterLinks";
import FooterContact from "./Footer/FooterContact";

const Footer = ({ user }) => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className={`default-bg pt-5`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-12">
              <img src={logo} alt="logo" width={"50px"} />
              <span className="ms-3 text-white fs-5 text-uppercase">
                Meskot
              </span>
              <p className="text-light small fw-semibold mt-4 pe-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                rem voluptates? Error maiores recusandae voluptates rerum rem
                veniam excepturi.
              </p>
              <p className="d-none d-md-block text-secondary small fw-semibold">
                Meskot &copy; {year}
              </p>
            </div>
            <div className="col-lg-8 col-12 mb-4">
              <div className="row">
                <SocialMedia></SocialMedia>
                <div className="col-lg-12 col-12 mt-4 ps-lg-5">
                  <FooterLinks></FooterLinks>
                  <FooterContact></FooterContact>
                </div>
              </div>
            </div>
            <p className="d-block d-md-none text-center text-secondary small fw-semibold">
              Meskot &copy; {year}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

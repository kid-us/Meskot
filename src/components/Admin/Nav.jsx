import React from "react";
import { logo2 } from "../../assets";
import { Link } from "react-router-dom";

const Nav = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="container-fluid bg-white py-2">
      <div className="row fw-semibold mx-lg-3 g-0">
        <div className="col-lg-1 col-5">
          <div className="row justify-content-start">
            <div className="col-12">
              <Link to="/">
                <img src={logo2} alt="Logo" width={"27px"} />
                <span className={` ${user && "text-black"} ms-lg-3 ms-1 fs-5`}>
                  Meskot
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-11 col-7">
          <div className="row justify-content-end g-0 me-lg-5">
            <div className="col-lg-1 col-6 text-end">
              <p className="fw-semibold">{user.name}</p>
            </div>
            <div className="col-lg-1 col-6 text-end">
              <p onClick={handleLogout} className="cursor fw-semibold">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

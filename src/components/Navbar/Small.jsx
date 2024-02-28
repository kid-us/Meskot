import React, { useState } from "react";
import { logo2 } from "../../assets";
import { Link } from "react-router-dom";
import { dropdown } from "../../constant/dropdown";
import { navbar } from "../../constant/navbar";
import { useAuth } from "../../context/Auth";
const Small = ({ user }) => {
  const { logout } = useAuth();

  const [dropdownClick, setDropdownClick] = useState(false);
  const handleDropdown = () => {
    setDropdownClick(!dropdownClick);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="container-fluid pt-2">
        <div className="row fw-semibold mx-lg-2 g-0">
          <div className="col-4">
            <div className="row justify-content-start">
              <div className="col-12 ms-lg-5 md-md-5">
                <Link to={"/"}>
                  <img src={logo2} alt="Logo" width={"27px"} />
                  <span className="text-black ms-2 fs-5">Meskot</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-8">
            {user ? (
              <div className="row justify-content-end ">
                <div className="col-lg-1 col-md-4 col-6 text-end">
                  <p
                    onClick={() => handleDropdown()}
                    className={`${
                      user && user.User_Type === "traveler"
                        ? "travelers-text"
                        : "buyers-text"
                    } cursor fw-semibold bi-list ${
                      dropdownClick && "bi-x-lg"
                    } fs-2`}
                  ></p>
                </div>
              </div>
            ) : (
              <div className="row justify-content-end g-0">
                <div className="col-8 text-end">
                  <div className="text-end">
                    <Link
                      to={"/login"}
                      className="nav-btn login-btn px-4 py-2 small text-light"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {dropdownClick && (
        <div
          className={`menu bg-white fw-semibold animate__animated animate__fadeInDown mt-3 pt-4 px-3`}
        >
          <p
            className={`${
              user.User_Type === "traveler" ? "travelers-text" : "buyers-text"
            } bi-person-fill fs-2 mb-4`}
          >
            &nbsp;
            {user.name}
          </p>
          <div>
            <hr className="mb-4" />
            {dropdown.map(
              (drop, index) =>
                drop.link !== "/" && (
                  <Link key={index} to={drop.link} className="fs-3 text-dark">
                    <p className="font-monospace ps-3 py-3">{drop.title}</p>
                  </Link>
                )
            )}

            {navbar.map((navs, index) => (
              <Link key={index} to={navs.link} className="fs-3 text-dark">
                <p className="font-monospace ps-3 py-3">{navs.title}</p>
              </Link>
            ))}
            <Link to="/" onClick={handleLogout} className="fs-3 text-danger">
              <p className="ps-3 py-3 bi-power small">Logout</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Small;
import React, { useState } from "react";
import { logo2 } from "../../assets";
import { Link } from "react-router-dom";
import { dropdown } from "../../constant/dropdown";
import { navbar } from "../../constant/navbar";
import { useAuth } from "../../context/Auth";
import Notification from "./Notification";
import axios from "axios";
import { request } from "../../constant/request";

const Large = ({ user, notification }) => {
  const { logout } = useAuth();

  const [dropdownClick, setDropdownClick] = useState(false);
  const [notificationClick, setNotificationClick] = useState(false);
  // Dropdown
  const handleDropdown = () => {
    setDropdownClick(!dropdownClick);
  };

  // Logout
  const handleLogout = () => {
    logout();
  };

  // handleNotification
  const handleNotification = (notify) => {
    console.log(notify);
    // const notificationId = {
    //   order_ids:
    //   window_ids:
    // }
    // if (notificationClick) {
    //   axios
    //     .post(`${request.baseUrl}/api/delete/notification`, notificationId, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //     setNotificationClick(false)
    // }else{
    //   setNotificationClick(true)
    // }
  };

  return (
    <>
      <div className="container-fluid pt-2">
        <div className="row fw-semibold mx-lg-2 g-0">
          <div className="col-1">
            <div className="row justify-content-start">
              <div className="col-12 ms-5">
                <Link to="/">
                  <img src={logo2} alt="Logo" width={"27px"} />
                  <span className={`text-black ms-lg-3 ms-1 fs-5`}>Meskot</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-11">
            {user ? (
              <div className="row justify-content-end g-0 me-5">
                {user.User_Type === "ADMIN" && (
                  <div className="col-1 text-end">
                    <Link className="text-black" to={"/admin"}>
                      Admin
                    </Link>
                  </div>
                )}

                {navbar.map((navs, index) => (
                  <div key={index} className="col-1 text-end">
                    <Link className="text-black" to={navs.link}>
                      {navs.title}
                    </Link>
                  </div>
                ))}

                <div className="col-1 text-end">
                  <p
                    className={`${
                      user && user.User_Type === "traveler"
                        ? "travelers-text"
                        : "buyers-text"
                    } cursor fw-semibold`}
                    onClick={() => handleDropdown()}
                  >
                    {user.name} &nbsp;
                    <span
                      className={`${
                        dropdownClick
                          ? "bi-caret-up-fill"
                          : "bi-caret-down-fill"
                      } small`}
                    ></span>
                  </p>
                </div>
                {notification.length > 0 && (
                  <div className="col-1 ps-5 position-relative">
                    <p
                      onClick={() => handleNotification(notification)}
                      className="cursor bi-bell-fill buyers-text"
                    >
                      <span className="position-absolute top-0 start-75 ms-3 translate-middle badge rounded-pill bg-danger"></span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="row justify-content-end g-0">
                <div className="col-1 text-end">
                  <Link to={"/login"} className="text-black">
                    Blog
                  </Link>
                </div>
                <div className="col-1 text-end">
                  <Link to={"/login"} className="text-black">
                    About Us
                  </Link>
                </div>
                <div className="col-2 ms-3 text-end me-4">
                  <Link
                    to={"/login"}
                    className="nav-btn login-btn px-5 px-md-4 px-1 small text-light"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {dropdownClick && (
        <div className={`dropdown bg-white py-3 ps-4 shadow fw-semibold`}>
          {user.User_Type === "ADMIN" ? (
            <Link
              onClick={handleLogout}
              className={`${
                user.User_Type === "traveler" ? "travelers-text" : "buyers-text"
              } cursor`}
            >
              <p className="mb-3">
                <span className="bi-power"></span>
                &nbsp; &nbsp; Logout
              </p>
            </Link>
          ) : (
            dropdown.map((drop, index) => (
              <Link
                key={index}
                onClick={drop.link === "/" ? handleLogout : undefined}
                to={drop.link}
                className={`${
                  user.User_Type === "traveler"
                    ? "travelers-text"
                    : "buyers-text"
                } cursor`}
              >
                <p key={index} className="mb-3">
                  <span className={drop.icon}></span>
                  &nbsp; &nbsp;
                  {drop.title}
                </p>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Notification */}
      {notificationClick && (
        <Notification notification={notification}></Notification>
      )}
    </>
  );
};

export default Large;

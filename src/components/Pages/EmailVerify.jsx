import React, { useState, useEffect } from "react";
import { logo2 } from "../../assets";
import { Link, useLocation } from "react-router-dom";
import { request } from "../../constant/request";
import axios from "axios";
const EmailVerify = () => {
  const location = useLocation();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const uid = searchParams.get("uid");
    
    if (token && uid) {
      const verify = {
        uid: uid,
        token: token,
      };

      axios
        .post(`${request.userUrl}/activation/`, verify, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setVerified(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setVerified(false);
    }
  }, [location]);
  return (
    <>
      <div className="login-page">
        <div className="forgot-password-container fw-semibold mt-5 pt-5">
          <div className="mb-lg-5 mb-4 pt-lg-5">
            <img src={logo2} alt="logo" width={"40px"} />
            <span className="ms-3 fs-4">Meskot</span>
          </div>

          {!verified ? (
            <div className="bg-white rounded p-3">
              <p>
                We've sent an activation link to the email you provided. To
                complete the verification process and activate your Meskot
                account, please check your inbox (and spam/junk folder, just in
                case) and click on the verification link.
              </p>
              <p>
                Your Meskot account cannot be used until your email address has
                been verified!
              </p>
            </div>
          ) : (
            <div className="bg-white rounded px-4 pb-1">
              <p className="text-center pt-4 fs-4 text-uppercase">
                <span className="bi-check-circle-fill fs-3 text-primary"></span>
                Your account is Verified
              </p>
              <Link to="/login">
                <p className="buyers-bg text-light text-center btns w-100 px-1 py-3 fw-semibold mb-lg-4 mt-4">
                  Log In
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerify;

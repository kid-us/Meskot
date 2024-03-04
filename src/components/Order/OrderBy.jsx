import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { request } from "../../constant/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const OrderBy = ({ name, order_id }) => {
  const [user, setUser] = useState();
  const { auth } = useAuth();
  const [loadBtn, setLoadBtn] = useState(false);
  const navigate = useNavigate();

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  useEffect(() => {
    setUser(auth);
  }, [auth]);

  const handleAcceptOrder = () => {
    setLoadBtn(true);
    axios
      .get(`${request.baseUrl}api/accept_order/${order_id}/${auth.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          notify("Order has accepted Successfully");
          navigate("/order");
        }, 2000);
      })
      .catch((error) => {
        setLoadBtn(false);
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-lg-5">
        <div className="order-by mt-5 ">
          <div className="order-by-order-top"></div>
          <div className="order-by-order-bottom"></div>

          <div className="row justify-content-end">
            <div
              className="col-lg-10 col-6 mt-3 fw-semibold"
              style={{ lineHeight: "7px" }}
            >
              <p className="text-uppercase small">Order By</p>
              <p className="text-primary">{name}</p>
            </div>
            {user && user.User_Type === "traveler" ? (
              <div className="col-lg-2 col-6 text-end small mt-2">
                {loadBtn ? (
                  <p className="btns buyers-bg py-2 px-4 text-center text-white">
                    <span className="spinner-border me-4 p-0 "></span>
                  </p>
                ) : (
                  <button
                    onClick={() => handleAcceptOrder()}
                    className="btns buyers-bg py-2 px-4 text-white"
                  >
                    Accept Order
                  </button>
                )}
              </div>
            ) : (
              <div className="col-lg-2 col-6 text-end small mt-2"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderBy;

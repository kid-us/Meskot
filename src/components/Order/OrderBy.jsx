import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { request } from "../../constant/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderBy = ({ name, order_id }) => {
  const [user, setUser] = useState();
  const { auth } = useAuth();

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  useEffect(() => {
    setUser(auth);
  }, [auth]);

  const handleAcceptOrder = () => {
    axios
      .get(`${request.baseUrl}api/accept_order/${order_id}/${auth.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        notify(response.data.Msg);
      })
      .catch((error) => {
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
                <button
                  onClick={() => handleAcceptOrder()}
                  className="btns buyers-bg py-2 px-4 text-white"
                >
                  Accept Order
                </button>
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

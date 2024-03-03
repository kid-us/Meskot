import React from "react";
import "../../modals.css";
import axios from "axios";
import { request } from "../../constant/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmDelete = ({ deleteItem, deleteData, closeDeleteConfirm }) => {
  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  const handleDeleteOrder = (order_id) => {
    if (deleteItem === "order") {
      axios
        .delete(`${request.baseUrl}api/order/${order_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          notify("Order Deleted Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/close_window/${window_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          notify("Window Closed Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <ToastContainer theme="dark" className={"mt-5"} />

      <div className="overlay"></div>
      <div className="container">
        <div className="confirm-modal">
          <p className="fw-semibold text-end pt-2">
            <span
              onClick={() => closeDeleteConfirm()}
              className="bi-x-lg pe-3"
            ></span>
          </p>
          <p className="text-center">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>

          <div className="row justify-content-center px-5 m-lg-4 m-3">
            <div className="col-lg-4 col-6">
              <button
                onClick={() => closeDeleteConfirm()}
                className="btn p-1 px-4 bg-danger text-white"
              >
                Cancel
              </button>
            </div>
            <div className="col-lg-4 col-6">
              <button
                onClick={() => handleDeleteOrder(deleteData)}
                className="btn p-1 px-4 bg-primary text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDelete;

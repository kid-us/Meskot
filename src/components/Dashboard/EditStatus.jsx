import React, { useState, useEffect } from "react";
import axios from "axios";
import { request } from "../../constant/request";
import "../../modals.css";
import { useAuth } from "../../context/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditForm = ({ editData, closeStatusModal, user }) => {
  const [status, setStatus] = useState(editData.status);
  const { auth } = useAuth();

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const changeStatus = {
      status: status,
    };

    if (user === "traveler") {
      axios
        .patch(
          `${request.baseUrl}api/window/${editData.window_id}`,
          changeStatus,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          notify("Status changed Successfully!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (user === "buyer") {
      axios
        .patch(
          `${request.baseUrl}api/order/${editData.order_id}`,
          changeStatus,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          notify("Status changed Successfully!");
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

      <div className="status-modals ">
        <p className="text-end pt-3">
          <span
            onClick={() => closeStatusModal()}
            className="bi-x-lg fs-5 text-black me-4 cursor"
          ></span>
        </p>
        <div className="px-4">
          <p className="fs-5 mb-4 fw-semibold">Edit the status</p>
          <form className="rounded">
            <div className="row justify-content-center">
              <div className="col-12">
                <label
                  htmlFor="size"
                  className="ms-1 mb-2 text-secondary small fw-semibold"
                >
                  Status{editData.status && ` / Prev: ${editData.status}`}
                </label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  name="size"
                  value={status}
                  className="form-select border border-secondary small mb-3 fw-semibold"
                >
                  <option value="Pending" className="text-secondary ">
                    Pending
                  </option>
                  <option value="Approved" className="text-secondary">
                    Approved
                  </option>
                  {user === "buyer" && (
                    <>
                      <option value="Accepted" className="text-secondary">
                        Accepted
                      </option>
                      <option value="Payed" className="text-secondary">
                        Payed
                      </option>
                      <option value="Purchased" className="text-secondary">
                        Purchased
                      </option>
                      <option value="Completed" className="text-secondary">
                        Completed
                      </option>
                    </>
                  )}
                </select>
              </div>

              <div className="col-12">
                <button
                  onClick={() => handleSubmit(event)}
                  className="buyers-bg text-light btns w-100 px-1 py-2 fw-semibold mb-lg-4 mt-4"
                >
                  Change
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditForm;

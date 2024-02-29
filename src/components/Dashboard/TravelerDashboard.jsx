import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { request } from "../../constant/request";
import axios from "axios";
import getFormattedDate from "../../constant/formatDate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditStatus from "./EditStatus";

const TravelerDashboard = ({ window, approve }) => {
  const [feedWindow, setFeedWindow] = useState();
  const [caretBtnClicked, setCaretBtnClicked] = useState(false);
  const [editedWindow, setEditedWindow] = useState();

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };
  // On load
  useEffect(() => {
    setFeedWindow(window);
  }, [window]);

  // Handle Close Window
  const handleCloseWindow = (window_id) => {
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
  };

  // Handle Status
  const handleStatus = (window_id) => {
    // alert(window_id);
    axios
      .get(`${request.baseUrl}api/window/${window_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEditedWindow(response.data);
        setCaretBtnClicked(true);
      })
      .catch((error) => {
        console.log(error);
        setCaretBtnClicked(false);
      });
  };

  // Close Modal
  const closeModal = () => {
    setCaretBtnClicked(false);
    setEditedWindow();
  };

  return (
    <>
      <div className="mx-lg-5 mb-4">
        <ToastContainer theme="dark" className={"mt-5"} />
        <div className="row justify-content-center gx-lg-3 gx-lg-2 px-lg-2">
          {feedWindow
            ? feedWindow.results.length > 0
              ? feedWindow.results.map((windows, index) => (
                  //   windows.close_date < currentDate() ? "YEs" : "NO"
                  <div
                    key={index}
                    className="row justify-content-center shadow mb-3 rounded py-3 bg-white"
                  >
                    <div className="col-lg-4 col-md-4 col-6 ps-lg-5">
                      <p className="text-secondary bi-flag-fill fw-semibold text-uppercase">
                        &nbsp; Country
                      </p>
                      <div className="row">
                        <div className="col-lg-3 col-12">
                          <ReactCountryFlag
                            countryCode={windows.country}
                            svg
                            style={{
                              width: "3em",
                              height: "auto",
                              border: "1px solid #000",
                              borderRadius: "5px",
                            }}
                            title={windows.country}
                          />
                        </div>
                        <div className="col-lg-2 col-12 mt-lg-0 mt-2">
                          <p className="font-poppins text-secondary">
                            {windows.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-6 ps-lg-5">
                      <p className="text-secondary bi-calendar2-check-fill fw-semibold text-uppercase">
                        &nbsp; Arrival Date
                      </p>
                      <p className="text-black fw-semibold font-monospace">
                        {getFormattedDate(`${windows.arrival_date}`)}
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-3 col-6 ps-lg-5">
                      <p className="text-secondary bi-calendar-x-fill fw-semibold text-uppercase">
                        &nbsp; Close Date
                      </p>
                      <p className="text-black fw-semibold font-monospace">
                        {getFormattedDate(`${windows.close_date}`)}
                      </p>
                    </div>
                    <div
                      className={`${
                        approve
                          ? "col-lg-1 col-md-2 col-4"
                          : "col-lg-2 col-md-2 col-6"
                      }  pt-4`}
                    >
                      <p
                        onClick={() => handleCloseWindow(windows.window_id)}
                        className="text-center cursor"
                      >
                        <span className="bg-danger bi-x-lg text-white p-2 rounded cursor"></span>
                      </p>
                    </div>
                    {approve === true && (
                      <div className="col-1 pt-4">
                        <p
                          onClick={() => handleStatus(windows.window_id)}
                          className="text-center cursor"
                        >
                          <span className="bg-success bi-caret-down-fill text-white p-2 rounded cursor"></span>
                        </p>
                      </div>
                    )}
                  </div>
                ))
              : ""
            : ""}
        </div>
      </div>

      {caretBtnClicked && (
        <EditStatus
          editData={editedWindow}
          closeStatusModal={() => closeModal()}
          user={"traveler"}
        ></EditStatus>
      )}
    </>
  );
};

export default TravelerDashboard;

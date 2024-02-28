import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { request } from "../../constant/request";
import Pagination from "../Pagination";
import getFormattedDate from "../../constant/formatDate";

const windowFeed = ({ window }) => {
  const [feedWindow, setFeedWindow] = useState();
  // On load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    if (page !== null) {
      axios
        .get(`${request.baseUrl}api/window?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setFeedWindow(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setFeedWindow(window);
    }
  }, [window]);

  //   Pagination
  const handlePagination = (link) => {
    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    const page = searchParams.get("page");
    if (page !== null) {
      axios
        .get(`${request.baseUrl}api/window?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setFeedWindow(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/window`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setFeedWindow(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="row justify-content-center gx-lg-3 gx-2 px-2">
        {feedWindow
          ? feedWindow.results.length > 0
            ? feedWindow.results.map((windows, index) => (
                //   windows.close_date < currentDate() ? "YEs" : "NO"
                <Link to={`/window/${windows.window_id}`} key={index}>
                  <div className="row justify-content-center shadow mb-3 rounded p-3 bg-white">
                    <div className="col-4">
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
                    <div className="col-4">
                      <p className="text-secondary bi-calendar2-check-fill fw-semibold text-uppercase">
                        &nbsp; Arrival Date
                      </p>
                      <p className="text-black fw-semibold font-monospace">
                        {getFormattedDate(`${windows.arrival_date}`)}
                      </p>
                    </div>
                    <div className="col-4">
                      <p className="text-secondary bi-calendar-x-fill fw-semibold text-uppercase">
                        &nbsp; Close Date
                      </p>
                      <p className="text-black fw-semibold font-monospace">
                        {getFormattedDate(`${windows.close_date}`)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : ""
          : ""}

        <Pagination
          comingTo={"window"}
          onPagination={() => handlePagination()}
          data={feedWindow}
        ></Pagination>
        {/* Pagination */}
        {/* {feedWindow ? (
          feedWindow.next !== null && feedWindow.previous !== null ? (
            ""
          ) : (
            <div className="col-12 text-end fw-semibold mt-4">
              {feedWindow.previous === null ? (
                <span className="me-4 text-uppercase bg-secondary px-3 small rounded py-2 text-white">
                  Previous
                </span>
              ) : (
                <Link
                  to={`/window${getParameter(feedWindow.previous)}`}
                  onClick={() => handlePagination(feedWindow.previous)}
                  className="text-uppercase text-white buyers-bg px-3 small shadow rounded py-2"
                >
                  Previous
                </Link>
              )}

              {feedWindow.next === null ? (
                <span className="ms-4 text-uppercase bg-secondary px-3 small rounded py-2 text-white">
                  Next
                </span>
              ) : (
                <Link
                  to={`/window${getParameter(feedWindow.next)}`}
                  onClick={() => handlePagination(feedWindow.next)}
                  className="text-uppercase text-white buyers-bg px-3 small shadow rounded py-2"
                >
                  Next
                </Link>
              )}
            </div>
          )
        ) : (
          ""
        )} */}
      </div>
    </>
  );
};

export default windowFeed;

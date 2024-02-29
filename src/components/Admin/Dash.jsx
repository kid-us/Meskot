import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { request } from "../../constant/request";
import BuyerDashboard from "../Dashboard/BuyerDashboard";
import TravelerDashboard from "../Dashboard/TravelerDashboard";
import Pagination from "../Pagination";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blogs from "../Blog/Blogs";

const Dash = () => {
  const [window, setWindow] = useState();
  const [orders, setOrders] = useState();
  const [display, setDisplay] = useState("order");
  const { auth } = useAuth();
  const { logout } = useAuth();
  const [filterBy, setFilterBy] = useState("");

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    if (page !== null) {
      if (display === "order") {
        axios
          .get(`${request.baseUrl}api/admin/order?page=${page}`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setOrders(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get(`${request.baseUrl}api/admin/window?page=${page}`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setWindow(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      axios
        .get(`${request.baseUrl}api/admin/order`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`${request.baseUrl}api/admin/window`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setWindow(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Handle Pagination
  const handlePagination = (link) => {
    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    const page = searchParams.get("page");
    if (page !== null) {
      axios
        .get(`${request.baseUrl}api/admin/order?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/admin`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Handle Filter
  const handleFilter = () => {
    if (display === "order") {
      axios
        .get(`${request.baseUrl}api/filter/order?status=${filterBy}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(`${request.baseUrl}api/filter/order?status=${filterBy}`);
          if (response.data.results.length <= 0) {
            notify(`There is no orders in the status of ${filterBy}`);
          } else {
            setOrders(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/filter/window?status=${filterBy}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.results.length <= 0) {
            notify(`There is no orders in the status of ${filterBy}`);
          } else {
            setWindow(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Nav user={auth} logout={logout}></Nav>
      <div className="container-fluid mt-3 mb-4">
        <div className="row justify-content-end fw-semibold me-lg-5 my-3">
          <div className="col-lg-1 col-md-3 col-3">
            <p
              onClick={() => setDisplay("order")}
              className={`cursor ${display === "order" && "text-secondary"}`}
            >
              Orders
            </p>
          </div>
          <div className="col-lg-1 col-md-3 col-3">
            <p
              onClick={() => {
                setDisplay("window"), setFilterBy("");
              }}
              className={`cursor ${display === "window" && "text-secondary"}`}
            >
              Windows
            </p>
          </div>
          <div className="col-lg-1 col-md-3 col-3">
            <p
              onClick={() => setDisplay("blog")}
              className={`cursor ${display === "blog" && "text-secondary"}`}
            >
              Blog
            </p>
          </div>
          <div className="col-lg-1 col-md-3 col-3">
            <Link to={"/admin/post-blog"} className="cursor">
              Post Blog
            </Link>
          </div>
        </div>

        <div className="row justify-content-center pe-lg-2">
          {/* Filter */}
          {display !== "blog" && (
            <div className="col-lg-2 col-md-2 col-12 fw-semibold ps-5">
              <div className="row">
                <div className="col-9">
                  <p className="fs-5">
                    <span className="bi-sliders"></span> Filter
                  </p>
                </div>
                <div className="col-1 mt-1">
                  {filterBy !== "" && (
                    <button
                      onClick={() => handleFilter()}
                      className="small bi-check-all border rounded buyers-bg text-white px-2 cursor"
                    ></button>
                  )}
                </div>
              </div>
              {display === "order" ? (
                <>
                  <div className="lh-lg">
                    <input
                      type="radio"
                      name="filter"
                      className="form-control-check cursor"
                      onClick={() => setFilterBy("Pending")}
                    />
                    <label
                      htmlFor={"pending"}
                      className="ms-2 form-check-label cursor small text-uppercase"
                    >
                      Pending
                    </label>
                  </div>
                  <div className="lh-lg">
                    <input
                      type="radio"
                      name="filter"
                      className="form-control-check cursor"
                      onClick={() => setFilterBy("Approved")}
                    />
                    <label
                      htmlFor={"approved"}
                      className="ms-2 form-check-label cursor small text-uppercase"
                    >
                      Approved
                    </label>
                  </div>
                  <div className="lh-lg">
                    <input
                      type="radio"
                      name="filter"
                      className="form-control-check cursor"
                      onClick={() => setFilterBy("Accepted")}
                    />
                    <label
                      htmlFor={"accepted"}
                      className="ms-2 form-check-label cursor small text-uppercase"
                    >
                      Accepted
                    </label>
                  </div>
                  <div className="lh-lg">
                    <input
                      type="radio"
                      name="filter"
                      className="form-control-check cursor"
                      onClick={() => setFilterBy("Payed")}
                    />
                    <label
                      htmlFor={"Payed"}
                      className="ms-2 form-check-label cursor small text-uppercase"
                    >
                      Payed
                    </label>
                  </div>
                  <div className="lh-lg">
                    <input
                      type="radio"
                      name="filter"
                      className="form-control-check cursor"
                      onClick={() => setFilterBy("Purchased")}
                    />
                    <label
                      htmlFor={"purchased"}
                      className="ms-2 form-check-label cursor small text-uppercase"
                    >
                      Purchased
                    </label>
                  </div>
                  <div className="lh-lg">
                    <input
                      type="radio"
                      name="filter"
                      className="form-control-check cursor"
                      onClick={() => setFilterBy("Completed")}
                    />
                    <label
                      htmlFor={"completed"}
                      className="ms-2 form-check-label cursor small text-uppercase"
                    >
                      Completed
                    </label>
                  </div>
                </>
              ) : display === "window" ? (
                <>
                  <div className="lh-lg">
                    <input
                      type="radio"
                      name="filter"
                      className="form-control-check cursor"
                      onClick={() => setFilterBy("pending")}
                    />
                    <label
                      htmlFor={"pending"}
                      className="ms-2 form-check-label cursor small text-uppercase"
                    >
                      Pending
                    </label>
                  </div>
                  <div className="lh-lg">
                    <input
                      type="radio"
                      name="filter"
                      className="form-control-check cursor"
                      onClick={() => setFilterBy("approved")}
                    />
                    <label
                      htmlFor={"approved"}
                      className="ms-2 form-check-label cursor small text-uppercase"
                    >
                      Approved
                    </label>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          )}
          {/* Display */}
          <div
            className={`${
              display === "blog" ? "col-12" : "col-lg-10 col-md-10 col-12"
            } `}
          >
            {display === "order" ? (
              <>
                {orders ? (
                  orders.results.length > 0 ? (
                    <>
                      <BuyerDashboard
                        orders={orders}
                        approve={true}
                      ></BuyerDashboard>
                      <Pagination
                        comingTo={"admin"}
                        onPagination={() => handlePagination()}
                        data={orders}
                      ></Pagination>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </>
            ) : display === "window" ? (
              <>
                {window ? (
                  window.results.length > 0 ? (
                    <>
                      <TravelerDashboard
                        window={window}
                        approve={true}
                      ></TravelerDashboard>
                      <Pagination
                        comingTo={"admin"}
                        onPagination={() => handlePagination()}
                        data={window}
                      ></Pagination>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </>
            ) : (
              <Blogs edit={true} remove={true}></Blogs>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dash;

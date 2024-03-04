import React, { useState, useEffect } from "react";
import Navbar from "../NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { request } from "../../constant/request";
import BuyerDashboard from "../Dashboard/BuyerDashboard";
import Pagination from "../Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
import Links from "./Links";
import Loading from "../Loading/Loading";

const OrdersView = () => {
  const [orders, setOrders] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.User_Type !== "ADMIN") {
      navigate("/order");
    }
  });

  const notify = (msg) => {
    toast(`${msg} !`, {
      position: "top-right",
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
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
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/admin/order`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrders(response.data);
          setLoading(false);
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
    axios
      .get(`${request.baseUrl}api/filter/order?status=${filterBy}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.results.length <= 0) {
          notify(`There is no orders in the status of ${filterBy}`);
        } else {
          setOrders(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {loading && <Loading></Loading>}
      <Navbar user={auth} logout={logout}></Navbar>
      <div className="container-fluid my-5 pt-4">
        <Links activeAt={"order"}></Links>
        <div className="row justify-content-center pe-lg-2">
          {/* Filter */}
          <div className="col-lg-2 col-md-2 col-12 fw-semibold ps-5">
            <div className="row">
              <div className="col-6">
                <p className="fs-5">
                  <span className="bi-sliders"></span> Filter
                </p>
              </div>
              <div className="col-2 mt-1">
                {filterBy !== "" && (
                  <button
                    onClick={() => handleFilter()}
                    className="small  border rounded buyers-bg text-white cursor p-1 px-3"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
            <div className="lh-lg">
              <p
                className="lh-1 bi-check cursor"
                onClick={() => location.reload()}
              >
                All
              </p>
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
          </div>

          {/* Display */}
          <div className={`col-lg-10 col-md-10 col-12`}>
            <p className="fw-semibold fs-5">Orders</p>
            {orders ? (
              orders.results.length > 0 ? (
                <>
                  <BuyerDashboard
                    orders={orders}
                    approve={true}
                  ></BuyerDashboard>
                  <Pagination
                    comingTo={"admin/order"}
                    onPagination={() => handlePagination()}
                    data={orders}
                  ></Pagination>
                </>
              ) : (
                <p className="my-5 p-5 bg-white fs-5 text-center">
                  There is no Orders Yet.
                </p>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default OrdersView;

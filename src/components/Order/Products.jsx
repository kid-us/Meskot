import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { request } from "../../constant/request";
import Img from "../Img/Img";
import Pagination from "../Pagination";

const Products = ({ orders }) => {
  const [ordersFeed, setOrdersFeed] = useState();
  // On load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    if (page !== null) {
      axios
        .get(`${request.baseUrl}api/order?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrdersFeed(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setOrdersFeed(orders);
    }
  }, [orders]);

  // Get the page parameter
  const getParameter = (link) => {
    const url = new URL(link);
    const pageParam = url.searchParams.get("page");
    const page = `?page=${pageParam}`;
    if (pageParam === null) {
      return "";
    } else {
      return page;
    }
  };

  // Handle Pagination
  const handlePagination = (link) => {
    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    const page = searchParams.get("page");
    if (page !== null) {
      axios
        .get(`${request.baseUrl}api/order?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrdersFeed(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/order`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrdersFeed(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="row justify-content-center gx-lg-3 gx-2 px-1">
        {ordersFeed ? (
          ordersFeed.results.length > 0 ? (
            ordersFeed.results.map((order, index) => (
              <div key={index} className="col-lg-4 col-md-4 col-6 mb-4">
                <Link to={`/order/${order.order_id}`} className="text-dark">
                  <div className="orders shadow bg-white rounded">
                    <div className="order-img-container pt-2 text-center">
                      <Img
                        src={order.upload_img}
                        alt="Order Picture"
                        className="order-img"
                      ></Img>
                    </div>

                    <div className="order-info ps-4">
                      <p className="fw-semibold mt-3 d-none d-md-block">
                        <span className="font-poppins text-uppercase">
                          {order.object_type}
                        </span>
                        <span className="font-monospace ps-5 ms-5 small">
                          Size {order.size}
                        </span>
                      </p>
                      {/* Small device */}
                      <div className="fw-semibold d-block d-md-none">
                        <p className="font-poppins text-uppercase">
                          {order.object_type}
                        </p>
                        <p className="font-monospace small">
                          Size {order.size}
                        </p>
                      </div>
                      <p className="font-poppins pt-2 ">{order.price}$</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center fw-semibold">
              <p>All Orders are taken by the travelers!</p>
              <p>Post new Orders!</p>
            </div>
          )
        ) : (
          ""
        )}

        <Pagination
          comingTo={"order"}
          onPagination={() => handlePagination()}
          data={ordersFeed}
        ></Pagination>

        {/* {ordersFeed ? (
          ordersFeed.results.length > 0 ? (
            ordersFeed.next !== null && ordersFeed.previous !== null ? (
              ""
            ) : (
              <div className="col-12 text-end fw-semibold mt-4">
                {ordersFeed.previous === null ? (
                  <span className="me-4 text-uppercase bg-secondary px-3 small rounded py-2 text-white">
                    Previous
                  </span>
                ) : (
                  <Link
                    to={`/order${getParameter(ordersFeed.previous)}`}
                    onClick={() => handlePagination(ordersFeed.previous)}
                    className="text-uppercase text-white buyers-bg px-3 small shadow rounded py-2"
                  >
                    Previous
                  </Link>
                )}

                {ordersFeed.next === null ? (
                  <span className="ms-4 text-uppercase bg-secondary px-3 small rounded py-2 text-white">
                    Next
                  </span>
                ) : (
                  <Link
                    to={`/order${getParameter(ordersFeed.next)}`}
                    onClick={() => handlePagination(ordersFeed.next)}
                    className="text-uppercase text-white buyers-bg px-3 small shadow rounded py-2"
                  >
                    Next
                  </Link>
                )}
              </div>
            )
          ) : (
            ""
          )
        ) : (
          ""
        )} */}
      </div>
    </>
  );
};

export default Products;

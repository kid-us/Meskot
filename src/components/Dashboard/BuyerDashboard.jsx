import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { request } from "../../constant/request";
import EditForm from "./EditForm";
import EditStatus from "./EditStatus";
import ConfirmDelete from "./ConfirmDelete";

const BuyerDashboard = ({ orders, approve, revoke }) => {
  const [editedOrder, setEditedOrder] = useState();
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [caretBtnClicked, setCaretBtnClicked] = useState(false);
  const [editedStatus, setEditedStatus] = useState();
  const [deleteData, setDeleteData] = useState("");

  // Handle Edit Order
  const handleEditBtn = (order_id) => {
    axios
      .get(`${request.baseUrl}api/order/${order_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEditBtnClicked(true);
        setEditedOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
        setEditBtnClicked(false);
      });
  };

  // Handle approve btn
  const handleStatus = (order_id) => {
    axios
      .get(`${request.baseUrl}api/order/${order_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEditedStatus(response.data);
        setCaretBtnClicked(true);
      })
      .catch((error) => {
        console.log(error);
        setCaretBtnClicked(false);
      });
  };

  // Close
  const closeModal = () => {
    setEditBtnClicked(false);
    setEditedOrder();
    setCaretBtnClicked(false);
  };

  return (
    <>
      <ToastContainer theme="dark" className={"mt-5"} />
      {orders ? (
        orders.results.length > 0 ? (
          orders.results.map((order, index) => (
            <div
              key={index}
              className="row shadow bg-white rounded mb-3 pt-4 mt-4 mt-lg-0 fw-semibold small"
            >
              <div className="col-lg-3 col-md-3 col-3">
                <div className="text-center">
                  <img
                    src={order.upload_img}
                    className="img-fluid"
                    width={"100px"}
                    alt="order image"
                  ></img>
                </div>
              </div>
              <div className="col-lg-1 col-md-2 col-3">
                <p className="buyers-text">Name</p>
                <p className="">{order.object_name}</p>
              </div>
              <div className="col-lg-1 col-md-2 col-3">
                <p className="buyers-text">Price</p>
                <p>{order.price}</p>
              </div>
              <div className="col-lg-1 col-md-2 col-3">
                <p className="buyers-text">Size</p>
                <p className="text-uppercase">{order.size}</p>
              </div>
              <div className="col-lg-1 col-md-2 col-3">
                <p className="buyers-text">Type</p>
                <p className="text-uppercase">{order.object_type}</p>
              </div>
              <div className="col-lg-1 col-md-2 col-3">
                <p className="buyers-text">Quantity</p>
                <p>{order.quantity}</p>
              </div>
              <div className="col-lg-1 col-md-2 col-3">
                <p className="buyers-text">Weight</p>
                <p>{order.approx_weight}</p>
              </div>
              <div className="col-lg-1 col-md-2 col-3">
                <p className="buyers-text">URL</p>
                <p>
                  <Link to={order.url}>VISIT</Link>
                </p>
              </div>
              <div className="col-lg-2 col-md-4 col-4">
                <p className="buyers-text">Country</p>
                <ReactCountryFlag
                  countryCode={order.country}
                  svg
                  style={{
                    width: "3em",
                    height: "auto",
                    border: "1px solid #000",
                    borderRadius: "5px",
                  }}
                  title={order.country}
                />
                <span className="ms-4">{order.country}</span>
              </div>
              <div className="col-lg-10 col-md-12 col-12 mt-lg-0 mt-3 px-lg-5">
                <p className="buyers-text">Description</p>
                <p>{order.Description}</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12 mt-lg-4 pt-2">
                <div className="row ">
                  <div className={`col-lg-3 col-2 ${revoke && "d-none"}`}>
                    <p
                      onClick={() => setDeleteData(order.order_id)}
                      className="text-center cursor"
                    >
                      <span className="bg-danger bi-x-lg text-white p-2 rounded cursor"></span>
                    </p>
                  </div>
                  <div className={`col-lg-3 col-2 ${revoke && "d-none"}`}>
                    <p
                      onClick={() => handleEditBtn(order.order_id)}
                      className="text-center cursor"
                    >
                      <span className="bg-primary bi-pen-fill text-black p-2 rounded cursor"></span>
                    </p>
                  </div>
                  {approve === true && (
                    <div className={`col-1`}>
                      <p
                        onClick={() => handleStatus(order.order_id)}
                        className="text-center cursor"
                      >
                        <span className="bg-success bi-caret-down-fill text-white p-2 rounded cursor"></span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
      {/* edit btn */}
      {editBtnClicked && (
        <EditForm
          editData={editedOrder}
          closeEditModal={() => closeModal()}
        ></EditForm>
      )}
      {/* Caret */}
      {caretBtnClicked && (
        <EditStatus
          editData={editedStatus}
          closeStatusModal={() => closeModal()}
          user={"buyer"}
        ></EditStatus>
      )}
      {/* Delete Confirm */}
      {deleteData !== "" && (
        <ConfirmDelete
          deleteItem={"order"}
          deleteData={deleteData}
          closeDeleteConfirm={() => setDeleteData("")}
        ></ConfirmDelete>
      )}
    </>
  );
};

export default BuyerDashboard;

import React from "react";
import { Link } from "react-router-dom";

const ViewOrder = ({
  img,
  name,
  country,
  size,
  quantity,
  price,
  object,
  description,
  weight,
  url,
}) => {
  return (
    <>
      <div className="row justify-content-center">
        <p className="font-poppins px-lg-5 fs-4">{name}</p>
        <div className="col-lg-6 col-md-6 col-12">
          <img src={img} alt="order-img" className="img-fluid" />
        </div>
        <div className="col-lg-5 col-12 fw-semibold mt-lg-0 mt-md-0 mt-4 p-lg-0 p-md-0 p-4">
          <div className="row">
            <div className="col-4">
              <p className="font-poppins">Country</p>
              <p>{country}</p>
            </div>
            <div className="col-4">
              <p className="font-poppins">Object</p>
              <p className="text-uppercase">{object}</p>
            </div>
            <div className="col-4">
              <p className="font-poppins">Size</p>
              <p className="text-uppercase">{size}</p>
            </div>
            <div className="col-4">
              <p className="font-poppins">Price</p>
              <p>{price}$</p>
            </div>
            <div className="col-4">
              <p className="font-poppins">Quantity</p>
              <p>{quantity}</p>
            </div>
            <div className="col-4">
              <p className="font-poppins">Weight</p>
              <p>{weight}kg</p>
            </div>
          </div>
          <p className="font-poppins">Description</p>
          <p>{description}</p>
          <p>URL of store Listing</p>
          <p>
            <Link
              to={url}
              className="buyers-bg py-1 px-4 rounded text-white shadow"
            >
              Visit URL
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewOrder;

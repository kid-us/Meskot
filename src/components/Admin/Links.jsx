import React from "react";
import { Link } from "react-router-dom";
const Links = ({ activeAt }) => {
  return (
    <>
      <div className="row justify-content-end fw-semibold me-lg-5 my-3">
        <div className="col-lg-1 col-md-3 col-3">
          <Link
            to={"/admin/order"}
            className={`cursor ${activeAt === "order" && "text-secondary"}`}
          >
            Orders
          </Link>
        </div>
        <div className="col-lg-1 col-md-3 col-3">
          <Link
            to={"/admin/window"}
            className={`cursor ${activeAt === "window" && "text-secondary"}`}
          >
            Windows
          </Link>
        </div>
        <div className="col-lg-1 col-md-3 col-3">
          <Link
            to={"/blog"}
            className={`cursor ${
              activeAt === "blog" && "text-secondary text-center"
            }`}
          >
            Blog
          </Link>
        </div>
        <div className="col-lg-1 col-md-3 col-3">
          <Link
            to={"/admin/post-blog"}
            className={`cursor ${activeAt === "post-blog" && "text-secondary"}`}
          >
            Post Blog
          </Link>
        </div>
      </div>
    </>
  );
};

export default Links;

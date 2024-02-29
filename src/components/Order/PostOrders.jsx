import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import PostOrderForm from "./Form/PostOrderForm";
import { useAuth } from "../../context/Auth";
import Loading from "../Loading/Loading";

const PostOrders = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      if (auth.User_Type !== "buyer") {
        navigate("/window");
      } else {
        setLoading(false);
      }
    }
  }, [auth]);

  return (
    <>
      {loading && <Loading></Loading>}
      <NavBar></NavBar>
      <div className="px-1 mt-5 pt-3">
        <div className="container-fluid fw-semibold py-4 pb-4">
          <p className="ms-lg-5">
            <Link to={"/"} className="text-black">
              Home
            </Link>
            &nbsp; / &nbsp;
            <Link to={"/order"} className="text-black">
              Order
            </Link>
            <span className="text-secondary"> / Post Order</span>
          </p>
          <PostOrderForm></PostOrderForm>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PostOrders;

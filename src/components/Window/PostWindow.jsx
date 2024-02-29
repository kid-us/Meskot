import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import PostWindowForm from "./Form/PostWindowForm";
import Footer from "../Footer";
import { useAuth } from "../../context/Auth";
import Loading from "../Loading/Loading";

const PostWindow = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (auth) {
      if (auth.User_Type !== "traveler") {
        navigate("/order");
        console.log(auth);
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
            <Link to={"/window"} className="text-black">
              Window
            </Link>
            <span className="text-secondary"> / Post Window</span>
          </p>
          <PostWindowForm></PostWindowForm>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PostWindow;

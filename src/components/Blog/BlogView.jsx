import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { request } from "../../constant/request";
import NavBar from "../NavBar";
import Loading from "../Loading/Loading";
import Footer from "../Footer";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${request.baseUrl}api/blog/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {loading && <Loading></Loading>}
      <NavBar></NavBar>
      {blog && (
        <div className="container my-5 pt-5">
          <div className="row justify-content-center bg-white rounded shadow">
            <div className="text-center pt-3">
              <img src={blog.upload_img} alt="Blog" className="img-fluid" />
            </div>
            <div className="px-5 fw-semibold">
              <p className="font-poppins fs-2">{blog.title}</p>
              <p className="small">{blog.body}</p>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </>
  );
};

export default BlogView;

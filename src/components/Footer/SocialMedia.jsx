import React from "react";
import { Link } from "react-router-dom";
const SocialMedia = () => {
  return (
    <div className="col-12 text-center ps-lg-5 mt-3">
      <Link className={`social-media text-danger bi-instagram p-1 fs-3`}></Link>
      <Link
        className={`social-media text-warning bi-snapchat mx-5 p-1 fs-3`}
      ></Link>
      <Link className={`social-media text-info bi-twitter p-1 fs-3`}></Link>
      <Link
        className={`social-media text-primary bi-facebook ms-5 p-1 fs-3`}
      ></Link>
    </div>
  );
};

export default SocialMedia;

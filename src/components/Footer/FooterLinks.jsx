import React from "react";
import { Link } from "react-router-dom";
import { footer } from "../../constant/footer";
const FooterLinks = () => {
  return (
    <>
      {/* Large Device */}
      <div className="d-none d-md-block">
        <div className="row fw-semibold">
          {footer.map((foot, index) => (
            <div key={index} style={{ width: "20%" }}>
              <Link
                className={`footer-links text-white text-uppercase`}
                to={foot.link}
              >
                {foot.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Small Device */}
      <div className="d-block d-md-none mt-2">
        <div className="row fw-semibold">
          {footer.map((foot, index) => (
            <div key={index} className="col-6 mb-2">
              <Link
                className={`footer-links text-white text-uppercase`}
                to={foot.link}
              >
                {foot.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FooterLinks;

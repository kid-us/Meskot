import React from "react";

const FooterContact = () => {
  return (
    <div className="d-flex mt-lg-5 mt-4">
      <p className="text-white fw-semibold small ">
        <span className="text-info bi-phone-fill"> Phone :</span>
        <span className="font-monospace"> +251993866658</span>
      </p>
      <p className="text-white fw-semibold ms-lg-5 small">
        <span className="text-info bi-envelope-fill">&nbsp; Email :</span>
        <span className=""> meskot@gmail.com</span>
      </p>
      <p className="text-white fw-semibold ms-lg-5 ms-2 small">
        <span className="text-info bi-geo-alt-fill">Address :</span>
        <span> Addis Ababa</span>
      </p>
    </div>
  );
};

export default FooterContact;

import React from "react";
import Slides from "./Slider";

const Swiper = () => {
  return (
    <>
      {/* Extra large */}
      <div className="d-block d-md-none">
        <Slides slidesPerView={1}></Slides>
      </div>
      {/* Large */}
      <div className="d-none d-md-block d-lg-none">
        <Slides slidesPerView={1}></Slides>
      </div>
      {/* Small */}
      <div className="d-none d-lg-block">
        <Slides slidesPerView={3}></Slides>
      </div>
    </>
  );
};

export default Swiper;

import React from "react";
import { Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { banner } from "../../constant/banner";
import Img from "../Img/Img";

const Slides = ({ slidesPerView }) => {
  return (
    <>
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
      >
        {banner.map((ban, index) => (
          <SwiperSlide key={index}>
            <div className="mb-4">
              <div className="rounded px-3">
                <div className="shadow-sm bg-white rounded">
                  <div className="pt-2 text-center">
                    <img
                      src={ban.img}
                      alt="Order Picture"
                      width={"90%"}
                      height={250}
                      className="object-fit-contain"
                    />
                  </div>

                  <div className="ps-4 mt-0 pb-2">
                    <p className="fw-semibold d-none d-md-block">
                      <span className="font-poppins text-uppercase">
                        {ban.type}
                      </span>
                      <span className="font-monospace ps-5 ms-5 small">
                        Size {ban.size}
                      </span>
                    </p>
                    {/* Small device */}
                    <div className="fw-semibold d-block d-md-none">
                      <p className="font-poppins text-uppercase">{ban.type}</p>
                      <p className="font-monospace small">Size {ban.size}</p>
                    </div>
                    <p className="font-poppins pt-2 ">{ban.price}$</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slides;

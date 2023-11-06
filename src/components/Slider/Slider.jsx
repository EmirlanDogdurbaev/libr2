import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./BookSlider.scss";
// import required modules
import { Pagination } from "swiper/modules";

function Slider() {
  const img =
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg";

  const cards = {
    width: "350px",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  };
  return (
    <div className="swiper-container">
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        navigatione={true}
      
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <article style={cards}>
            <img src={img} alt="" width={350} />
            <div>
              <h4>title </h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
                eius corporis. Adipisci doloremque nisi iusto sit rerum optio
                quos commodi?
              </p>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article style={cards}>
            <img src={img} alt="" width={350} />
            <div>
              <h4>title </h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
                eius corporis. Adipisci doloremque nisi iusto sit rerum optio
                quos commodi?
              </p>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article style={cards}>
            <img src={img} alt="" width={350} />
            <div>
              <h4>title </h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
                eius corporis. Adipisci doloremque nisi iusto sit rerum optio
                quos commodi?
              </p>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article style={cards}>
            <img src={img} alt="" width={350} />
            <div>
              <h4>title </h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
                eius corporis. Adipisci doloremque nisi iusto sit rerum optio
                quos commodi?
              </p>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article style={cards}>
            <img src={img} alt="" width={350} />
            <div>
              <h4>title </h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
                eius corporis. Adipisci doloremque nisi iusto sit rerum optio
                quos commodi?
              </p>
            </div>
          </article>
        </SwiperSlide>
        <SwiperSlide>
          <article style={cards}>
            <img src={img} alt="" width={350} />
            <div>
              <h4>title </h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
                eius corporis. Adipisci doloremque nisi iusto sit rerum optio
                quos commodi?
              </p>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;

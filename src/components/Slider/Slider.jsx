import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./BookSlider.scss";
// import required modules
import { Pagination } from "swiper/modules";
import BookCard from "../BookCard/BookCard";

function Slider({books}) {
 
  return (
    <div className="swiper-container">
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        navigation={true}
      
        modules={[Pagination]}
        className="mySwiper"
      >
        {books.map((item)=>{
          return <SwiperSlide>
          <BookCard data={item}/>
        </SwiperSlide>
        })}
      </Swiper>
    </div>
  );
}

export default Slider;

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./BookSlider.scss";
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
          return <SwiperSlide key={item.id}>
          <BookCard data={item}/>
        </SwiperSlide>
        })}
      </Swiper>
    </div>
  );
}

export default Slider;

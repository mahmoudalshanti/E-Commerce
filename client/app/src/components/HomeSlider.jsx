import ec1 from "../Images/e-1.jpg";
import ec2 from "../Images/e-2.png";
import ec3 from "../Images/e-3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

export default function HomeSlider() {
  return (
    <>
      <Swiper
        className="customSwiper"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        navigation
        pagination={{ clickable: true }}>
        <SwiperSlide>
          <img src={ec1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ec2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ec3} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

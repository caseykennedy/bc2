import "swiper/swiper.min.css";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const CryptoTicker = () => {
  return (
    <div className="flex w-full flex-row items-center overflow-hidden border-b border-zinc-800 bg-zinc-950">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={6}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CryptoTicker;

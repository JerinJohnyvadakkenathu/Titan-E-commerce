import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const ImageSlider = () => {
  const images = [
  "/images/slide1.webp",
  "/images/slide2.webp",
  "/images/slide3.webp",
  "/images/slide4.webp",
  "/images/slide5.webp",
  "/images/slide6.webp"
  ];

  return (
    <div className="max-w-[1500px] mx-auto min-h-[75vh] flex items-center">
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={20}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000 }}
    loop={true}
    className="rounded-lg w-full"
  >
    {images.map((img, index) => (
      <SwiperSlide key={index}>
        <img
          src={img}
          alt={`Slide ${index + 1}`}
          className="w-full h-[75vh] object-cover rounded-lg"
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
};

export default ImageSlider;

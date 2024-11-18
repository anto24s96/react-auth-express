import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { useAuth } from "../contexts/AuthContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const imageSlides = [
    {
        src: "https://wallpapercave.com/wp/wp8558452.jpg",
        alt: "Slide 1",
    },
    {
        src: "https://wallpaperaccess.com/full/1306038.jpg",
        alt: "Slide 2",
    },
    {
        src: "https://wallpaperaccess.com/full/1844046.jpg",
        alt: "Slide 3",
    },
    {
        src: "https://wallpapercave.com/wp/wp9319113.jpg",
        alt: "Slide 4",
    },
];

export default function () {
    const { isLoggedIn, user } = useAuth();

    return (
        <div>
            <Swiper
                className="w-full h-[650px]"
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                speed={1000}
                pagination={{ clickable: true }}
                loop={true}
            >
                {imageSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold mb-2">
                    Benvenuto
                    {isLoggedIn ? (
                        <span className="text-red-500 capitalize inline-block mx-1 italic">
                            {user.name}
                        </span>
                    ) : (
                        ""
                    )}
                    !
                </h1>
            </div>
        </div>
    );
}

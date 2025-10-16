import React from 'react'
import "./Slide.scss"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const Slide = ({ children, slidesToShow = 4 }) => {
    return (
        <div className="slide">
            <div className="container">
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView={slidesToShow}
                    spaceBetween={20}
                >
                    {React.Children.map(children, (child, idx) => (
                        <SwiperSlide key={idx}>{child}</SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Slide

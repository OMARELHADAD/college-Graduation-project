import React from 'react'
import "./Slide.scss"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const Slide = ({ children, slidesToShow = 4, arrows = true }) => {
    return (
        <div className="slide">
            <div className="container">
                <Swiper
                    modules={arrows ? [Navigation] : []}
                    navigation={arrows}
                    autoplay={false} // Explicitly disable autoplay
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

import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './StorySlider.scss';
import defaultImg from '../../images/default-user-image.jpg';

function StorySlider() {
    const [storis, setStoris] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]);
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        slidesToShow: 8,
        slidesToScroll: 8,
        speed: 100,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 8,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 5
                }
            }
        ]
    };
    return (
        <Slider {...settings} className='story-slider'>
            {
                storis.map(story => {
                    return (
                        <div className='story'>
                            <img src={defaultImg} alt="" />
                        </div>
                    )
                })
            }
        </Slider>
    )
}

export default StorySlider
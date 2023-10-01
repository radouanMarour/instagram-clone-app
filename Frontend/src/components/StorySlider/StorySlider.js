import React, { useState } from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './StorySlider.scss';
import defaultImg from '../../images/default-user-image.jpg';
import { Link } from 'react-router-dom';
import { UserPhoto } from '../../icons';

function StorySlider() {
	const { users } = useSelector(state => state.user);

	const settings = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 7,
		slidesToScroll: 7,
		speed: 100,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 7,
					slidesToScroll: 7,
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
				users.map(user => {
					return (
						<div className='story'>
							<UserPhoto profilePhoto={user.profilePhoto} userName={user.userName} />
						</div>
					)
				})
			}
		</Slider>
	)
}

export default StorySlider
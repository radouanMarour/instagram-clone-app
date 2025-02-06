import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import 'swiper/css';
import './StorySlider.scss';
import { UserPhoto } from '../../icons';

function StorySlider() {
	const { users } = useSelector(state => state.user);

	return (
		<Swiper
			spaceBetween={10}
			slidesPerView={7}
			className='story-slider'
			breakpoints={{
				320: {
					slidesPerView: 4,
				},
				480: {
					slidesPerView: 5,
				},
				600: {
					slidesPerView: 6,
				},
				1024: {
					slidesPerView: 7,
				}
			}}
		>
			{users.map(user => (
				<SwiperSlide key={user.id}>
					<div className='story'>
						<UserPhoto profilePhoto={user.profilePhoto} userName={user.userName} />
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}

export default StorySlider;
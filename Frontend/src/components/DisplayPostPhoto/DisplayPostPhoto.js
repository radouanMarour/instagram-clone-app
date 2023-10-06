import React from 'react';
import { useSelector } from 'react-redux';
import './DisplayPostPhoto.scss';
import defaultPostImg from '../../images/computer.jpg';

function DisplayPostPhoto() {
    const postImage = useSelector(state => state.createPost.post.image);

    return (
        <div className='post-photo'>
            <img src={`${postImage}` || defaultPostImg} alt='' />
        </div>
    )
}

export default DisplayPostPhoto
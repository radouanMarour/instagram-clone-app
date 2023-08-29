import React from 'react';
import './Comment.scss';
import defaultImg from '../../images/default-user-image.jpg';
import { AiOutlineHeart } from 'react-icons/ai';

function Comment() {
    return (
        <div className='comment'>
            <img src={defaultImg} alt="" />

            <p className='caption-text'>
                <span className='username'>username </span>
                this is just a simple text comment this is just a simple text comment this is just a simple text comment
                <br />
                <span className='created-at'>2d </span>
                <span className='likes'> 27 Likes</span>
            </p>
            <span>
                <AiOutlineHeart />
            </span>
        </div>
    )
}

export default Comment
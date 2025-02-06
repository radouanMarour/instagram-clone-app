import React from 'react';
import './Comment.scss';
// import defaultImg from '../../images/default-user-image.jpg';
// import { AiOutlineHeart } from 'react-icons/ai';
import { UserPhoto } from '../../icons';
import { formatDate } from '../../utils';

function Comment({ comment }) {
    return (
        <div className='comment'>
            <UserPhoto profilePhoto={comment.user?.profilePhoto} userName={comment.user?.userName} />
            <p className='caption-text'>
                <span className='username'>{comment.user?.userName} </span>
                {comment.text}
                <br />
                <span className='created-at'>
                    {formatDate(comment.createdAt)}
                </span>
                {/* <span className='likes'> 27 Likes</span> */}
            </p>
            {/* <span>
                <AiOutlineHeart />
            </span> */}
        </div>
    )
}

export default Comment
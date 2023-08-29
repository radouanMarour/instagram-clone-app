import React from 'react';
import './FollowButton.scss';

function FollowButton({ followed }) {
    return (
        <button className='follow-btn'>
            {followed ? "Following" : "Follow"}
        </button>
    )
}

export default FollowButton
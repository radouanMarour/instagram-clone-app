import React from 'react';
import './FriendSuggestion.scss';
import defaultImg from '../../images/default-user-image.jpg';
import { Link } from 'react-router-dom';
import FollowButton from '../FollowButton/FollowButton';

function FriendSuggestion() {
    return (
        <div className='friend-suggestion'>
            <div className='friend'>
                <Link to="user-name"><img src={defaultImg} alt="" /></Link>
                <p>Username <br /><span>name</span></p>
            </div>
            <FollowButton />
        </div>
    )
}

export default FriendSuggestion
import React from 'react';
import './FriendSuggestion.scss';
// import defaultImg from '../../images/default-user-image.jpg';
import { Link } from 'react-router-dom';
import FollowButton from '../FollowButton/FollowButton';
import { UserPhoto } from '../../icons';

function FriendSuggestion({ user }) {
    return (
        <div className='friend-suggestion'>
            <div className='friend'>
                <UserPhoto profilePhoto={user.profilePhoto} userName={user.userName} />
                <p>{user.userName} <br /><span>{user.fullName}</span></p>
            </div>
            <FollowButton
                userFollowers={user.followers}
                userId={user._id}
            />
        </div>
    )
}

export default FriendSuggestion
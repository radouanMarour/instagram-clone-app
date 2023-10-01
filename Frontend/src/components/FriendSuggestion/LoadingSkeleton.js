import React from 'react';
import './FriendSuggestion.scss';
// import defaultImg from '../../images/default-user-image.jpg';
import { Link } from 'react-router-dom';
import FollowButton from '../FollowButton/FollowButton';
import { UserPhoto } from '../../icons';
import ContentLoader from 'react-content-loader'

function FriendSkeleton(props) {
    return (
        <ContentLoader
            speed={2}
            width={350}
            height={40}
            viewBox="0 0 350 40"
            backgroundColor="#d9d9d9"
            foregroundColor="#ededed"
            {...props}
        >
            <rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
            <rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
        </ContentLoader>
    )
}

export default FriendSkeleton
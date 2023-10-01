import React from 'react';
import { useSelector } from 'react-redux';
import './ProfileTab.scss';
import { Link, useLocation } from 'react-router-dom';
import { BsGrid3X3 } from 'react-icons/bs'
import { MdBookmarkBorder } from 'react-icons/md';
import PostGrid from '../PostGrid/PostGrid';
import SavedPostsGrid from '../SavedPostsGrid/SavedPostsGrid';

function ProfileTab({ user }) {
    const location = useLocation();

    return (
        <div className='profile-tab'>
            <div className='profile-tab-links'>
                <Link
                    to={`/${user.userName}`}
                    className={location.pathname === `/${user.userName}` ? "active-tab" : ""}
                >
                    <BsGrid3X3 /><span>POSTS</span>
                </Link>
                <Link
                    to={`/${user.userName}/saved`}
                    className={location.pathname === `/${user.userName}/saved` ? "active-tab" : ""}
                >
                    <MdBookmarkBorder /><span>SAVED</span>
                </Link>
            </div>
            <div className='profile-tab-content'>
                {location.pathname === `/${user.userName}` && <PostGrid userId={user._id} />}
                {location.pathname === `/${user.userName}/saved` && <SavedPostsGrid userId={user._id} />}
            </div>
        </div>
    )
}

export default ProfileTab
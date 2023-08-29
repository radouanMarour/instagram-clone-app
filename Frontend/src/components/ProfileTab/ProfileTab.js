import React from 'react';
import './ProfileTab.scss';
import { Link, useLocation } from 'react-router-dom';
import { BsGrid3X3 } from 'react-icons/bs'
import { MdSlowMotionVideo, MdOutlinePermContactCalendar } from 'react-icons/md';
import PostGrid from '../PostGrid/PostGrid';

function ProfileTab() {
    const location = useLocation();


    return (
        <div className='profile-tab'>
            <div className='profile-tab-links'>
                <Link
                    to="/user-name"
                    className={location.pathname === "/user-name" ? "active-tab" : ""}
                >
                    <BsGrid3X3 /><span>POSTS</span>
                </Link>
                <Link
                    to="/user-name/reels"
                    className={location.pathname === "/user-name/reels" ? "active-tab" : ""}
                >
                    <MdSlowMotionVideo /><span>REELS</span>
                </Link>
                <Link
                    to="/user-name/tagged"
                    className={location.pathname === "/user-name/tagged" ? "active-tab" : ""}
                >
                    <MdOutlinePermContactCalendar /><span>TAGGED</span>
                </Link>
            </div>
            <div className='profile-tab-content'>
                {location.pathname === "/user-name" && <PostGrid />}
                {location.pathname === "/user-name/reels" && <div>Reels</div>}
                {location.pathname === "/user-name/tagged" && <div>Tagged</div>}
            </div>
        </div>
    )
}

export default ProfileTab
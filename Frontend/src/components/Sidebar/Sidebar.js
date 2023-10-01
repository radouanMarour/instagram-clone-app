import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';
import MakeLink from '../makeLink/MakeLink';
// import { BiSolidUserCircle } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import Search from '../Search/Search';
import Notifications from '../Notifications/Notifications';
import MoreModel from '../MoreModel/MoreModel';
import CreatePost from '../CreatePost/CreatePost';
import {
    HomeIcon,
    SearchIcon,
    ExploreIcon,
    // ReelsIcon,
    SendIcon,
    CreateIcon,
    NotifIcon,
    UserPhoto
} from '../../icons';


function Sidebar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [createPostOpen, setCreatePostOpen] = useState(false);
    const user = useSelector(state => state.auth.user)
    const location = useLocation();
    const path = location.pathname;

    const openSearch = () => {
        setSearchOpen(prev => !prev);
    }
    const openNotifications = () => {
        setNotifOpen(prev => !prev);
    }
    const openModel = () => {
        setModelOpen(prev => !prev);
    }
    const openCreatePost = () => {
        setCreatePostOpen(prev => !prev);
    }

    const closeSide = () => {
        setSearchOpen(false);
        setNotifOpen(false);
        setModelOpen(false);
    }

    return (
        <div className={searchOpen || notifOpen ? 'sidebar shrink' : 'sidebar'}>
            <div className='logo'>
                <MakeLink to="/" icon={<GrInstagram />} />
            </div>
            <nav>
                <ul>
                    <li onClick={closeSide}>
                        <MakeLink
                            to="/"
                            text="Home"
                            icon={<HomeIcon path={path} searchOpen={searchOpen} notifOpen={notifOpen} />}
                        />
                    </li>
                    <li onClick={openSearch} >
                        <MakeLink
                            text="Search"
                            icon={<SearchIcon searchOpen={searchOpen} />}
                        />
                    </li>
                    <li onClick={closeSide}>
                        <MakeLink
                            to="/explore"
                            text="Explore"
                            icon={<ExploreIcon path={path} searchOpen={searchOpen} notifOpen={notifOpen} />}
                        />
                    </li>
                    {/* <li onClick={closeSide}>
                        <MakeLink
                            to="/reels"
                            text="Reels"
                            icon={<ReelsIcon path={path} searchOpen={searchOpen} notifOpen={notifOpen} />}
                        />
                    </li> */}
                    <li onClick={closeSide}>
                        <MakeLink
                            text="Messages"
                            icon={<SendIcon messageOpen={false} />}
                        />
                    </li>
                    <li onClick={openNotifications}>
                        <MakeLink
                            text="Notification"
                            icon={<NotifIcon notifOpen={notifOpen} />}
                        />
                    </li>
                    <li onClick={openCreatePost}>
                        <MakeLink
                            text="Create"
                            icon={<CreateIcon createPostOpen={createPostOpen} />}
                        />
                    </li>
                    <li onClick={closeSide}>
                        <Link to={`/${user.userName}`}>
                            <UserPhoto profilePhoto={user.profilePhoto} userName={user.userName} />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li onClick={openModel}>
                        <MakeLink
                            text="More"
                            icon={<FaBars />}
                        />
                    </li>
                </ul>
            </nav>
            {searchOpen && <Search setSearchOpen={setSearchOpen} />}
            {notifOpen && <Notifications />}
            {modelOpen && <MoreModel setModelOpen={setModelOpen} />}
            {createPostOpen && <CreatePost closeCreatePost={openCreatePost} />}
        </div>
    )
}

export default Sidebar
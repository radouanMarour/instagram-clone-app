import React, { useState } from 'react'
import './Sidebar.scss';
import MakeLink from '../makeLink/MakeLink';
import { GoHome } from 'react-icons/go';
import { MdOutlineExplore, MdOutlineAddBox, MdSlowMotionVideo } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { BiSolidUserCircle } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { LuSend } from 'react-icons/lu';
import { FaBars } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import Search from '../Search/Search';
import Notifications from '../Notifications/Notifications';
import MoreModel from '../MoreModel/MoreModel';
import CreatePost from '../CreatePost/CreatePost';


function Sidebar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [createPostOpen, setCreatePostOpen] = useState(false);

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
                    <li onClick={closeSide}><MakeLink to="/" text="Home" icon={<GoHome />} /></li>
                    <li onClick={openSearch} ><MakeLink text="Search" icon={<BiSearch />} /></li>
                    <li onClick={closeSide}><MakeLink to="/explore" text="Explore" icon={<MdOutlineExplore />} /></li>
                    <li onClick={closeSide}><MakeLink to="/reels" text="Reels" icon={<MdSlowMotionVideo />} /></li>
                    <li onClick={closeSide}><MakeLink text="Messages" icon={<LuSend />} /></li>
                    <li onClick={openNotifications}><MakeLink text="Notification" icon={<AiOutlineHeart />} /></li>
                    <li onClick={openCreatePost}><MakeLink text="Create" icon={<MdOutlineAddBox />} /></li>
                    <li onClick={closeSide}><MakeLink text="Profile" to="/user-name" icon={<BiSolidUserCircle />} /></li>
                    <li onClick={openModel}><MakeLink text="More" icon={<FaBars />} /></li>
                </ul>
            </nav>
            {searchOpen && <Search />}
            {notifOpen && <Notifications />}
            {modelOpen && <MoreModel setModelOpen={setModelOpen} />}
            {createPostOpen && <CreatePost closeCreatePost={openCreatePost} />}
        </div>
    )
}

export default Sidebar
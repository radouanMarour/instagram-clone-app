import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './MobileSidebar.scss';
import MakeLink from '../makeLink/MakeLink';
import { GoHome } from 'react-icons/go';
import { MdOutlineExplore, MdOutlineAddBox, /*MdSlowMotionVideo*/ } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';
import { BiSolidUserCircle } from 'react-icons/bi';
import CreatePost from '../CreatePost/CreatePost';

function MobileSidebar() {
    const [createPostOpen, setCreatePostOpen] = useState(false);
    const user = useSelector(state => state.auth.user)


    const openCreatePost = () => {
        setCreatePostOpen(prev => !prev);
    }

    return (
        <div className='mobile-sidebar'>
            <nav>
                <ul>
                    <li><MakeLink to="/" text="Home" icon={<GoHome />} /></li>
                    <li><MakeLink to="/explore" text="Explore" icon={<MdOutlineExplore />} /></li>
                    {/* <li><MakeLink to="/reels" text="Reels" icon={<MdSlowMotionVideo />} /></li> */}
                    <li onClick={openCreatePost}><MakeLink text="Create" icon={<MdOutlineAddBox />} /></li>
                    <li><MakeLink text="Messages" icon={<LuSend />} /></li>
                    <li><MakeLink to={`/${user.userName}`} icon={<BiSolidUserCircle />} /></li>
                </ul>
            </nav>
            {createPostOpen && <CreatePost closeCreatePost={openCreatePost} />}
        </div>
    )
}

export default MobileSidebar
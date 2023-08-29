import React, { useState } from 'react';
import './Post.scss';
import defaultImg from '../../images/default-user-image.jpg';
import defaultPostImg from '../../images/computer.jpg';
import PostActions from '../PostActions/PostActions';
import { Link } from 'react-router-dom';
import AddComment from '../AddComment/AddComment';

function Post() {
    const [expanded, setExpanded] = useState(false);

    const style = {
        whiteSpace: expanded ? "normal" : "nowrap"
    }

    return (
        <div className='post'>
            <div className='post-header'>
                <div className='post-header-user'>
                    <Link to="user-name"><img src={defaultImg} alt="" /></Link>
                    <p>Username <br /><span>name</span></p>
                </div>
                <button className='three-btn'>...</button>
            </div>
            <img className='post-img' src={defaultPostImg} alt="" />
            <PostActions />
            <p className='caption' style={style} >username Today was the last time of Abel as The weeknd username Today was the last time of Abel as The weeknd</p>
            {!expanded && <button onClick={() => setExpanded(true)}>More</button>}<br />
            <Link to="/p/idpost">View all 45 comments</Link>
            <AddComment />
        </div>
    )
}

export default Post
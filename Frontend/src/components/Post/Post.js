import React, { useState } from 'react';
import './Post.scss';
import defaultImg from '../../images/default-user-image.jpg';
import defaultPostImg from '../../images/computer.jpg';
import PostActions from '../PostActions/PostActions';
import { Link } from 'react-router-dom';
import AddComment from '../AddComment/AddComment';
import { MdOutlineLinearScale } from 'react-icons/md';
import { UserPhoto } from '../../icons';
import OptionsModel from '../OptionsModel/OptionsModel';

function Post({ post }) {
    const { _id, user, image, caption, likes, comments } = post;
    const [expanded, setExpanded] = useState(false);
    const [openOptions, seOpenOptions] = useState(false);

    const style = {
        whiteSpace: expanded ? "normal" : "nowrap"
    }

    return (
        <div className='post'>
            <div className='post-header'>
                <div className='post-header-user'>
                    <Link to={`/${user.userName}`}>
                        <UserPhoto profilePhoto={user.profilePhoto} userName={user.userName} />
                    </Link>
                    <p>{user.userName} <br /><span>{user.fullName}</span></p>
                </div>
                <button className='three-btn' onClick={() => seOpenOptions(true)}>
                    <MdOutlineLinearScale />
                </button>
            </div>
            <img className='post-img' src={`https://insta-clone-dxtn.onrender.com/uploads/${image}`} alt="" />
            <PostActions likes={likes} postId={_id} userId={user._id} />
            <p className='caption' style={style} >{caption}</p>
            {!expanded && <button onClick={() => setExpanded(true)}>More...</button>}<br />
            <Link to={`/p/${_id}`}>View all {comments.length} comments</Link>
            <AddComment postId={_id} />
            {
                openOptions && <OptionsModel
                    seOpenOptions={seOpenOptions}
                    type="postOption"
                    post={post}
                />
            }
        </div >
    )
}

export default Post
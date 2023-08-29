import React from 'react';
import "./PostDetailsPage.scss";
import defaultPostImg from '../../images/computer.jpg';
import defaultImg from '../../images/default-user-image.jpg';
import { Link } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import PostActions from '../../components/PostActions/PostActions';
import AddComment from '../../components/AddComment/AddComment';
import { GrFormClose } from 'react-icons/gr';

function PostDetailsPage() {
    return (
        <div className='post-details'>
            <Link to="/" className='close-icon'><GrFormClose /></Link>
            <div className='post'>
                <img className='post-img' src={defaultPostImg} />
                <div className='post-info'>
                    <div className='post-info-header'>
                        <div className='post-info-user'>
                            <Link to="user-name"><img src={defaultImg} alt="" /></Link>
                            <p>Username <br /><span>name</span></p>
                        </div>
                        <button className='three-btn'>...</button>
                    </div>
                    <div className='comments'>
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                    <div className='reactions'>
                        <PostActions />
                        <AddComment />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetailsPage
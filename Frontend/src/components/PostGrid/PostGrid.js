import React from 'react';
import { useSelector } from 'react-redux';
import './PostGrid.scss';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
// import defaultPostImg from '../../images/computer.jpg';

function PostGrid({ userId }) {
    const { posts } = useSelector(state => state.post);
    const { user } = useSelector(state => state.auth);

    const myPosts = posts.filter(post => post.user._id === userId);

    if (myPosts.length === 0) {
        return (
            <div className='post-grid'>
                <h1>No posts </h1>
            </div>
        )
    }

    return (
        <div className='post-grid'>
            {
                myPosts.map((post, index) => (
                    <div className='post-grid-item' key={index}>

                        <img src={`https://insta-clone-dxtn.onrender.com/uploads/${post.image}`} alt="" />

                        <Link to={`/p/${post._id}`} className='overlay'>
                            <span>
                                <AiFillHeart color='#ffffff' />
                                {post.likes.length}
                            </span>
                            <span>
                                <FaComment color='#ffffff' />
                                {post.comments.length}
                            </span>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default PostGrid
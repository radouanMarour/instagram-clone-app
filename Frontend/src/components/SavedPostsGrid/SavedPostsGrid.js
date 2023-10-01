import React from 'react';
import { useSelector } from 'react-redux';
import './SavedPostsGrid.scss';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
// import defaultPostImg from '../../images/computer.jpg';

function SavedPostsGrid({ userId }) {
    const { posts } = useSelector(state => state.post);
    const { user } = useSelector(state => state.auth);

    const savedPosts = posts.filter(post => user.saved.includes(post._id));

    if (savedPosts.length === 0) {
        return (
            <div className='post-grid'>
                <h1>No posts </h1>
            </div>
        )
    }

    return (
        <div className='post-grid'>
            {
                savedPosts.map((post, index) => (
                    <div className='post-grid-item' key={index}>

                        <img src={`https://insta-clone-dxtn.onrender.com/${post.image}`} alt="" />

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

export default SavedPostsGrid
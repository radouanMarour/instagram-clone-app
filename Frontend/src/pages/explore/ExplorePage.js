import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './ExplorePage.scss';
import defaultPostImg from '../../images/computer.jpg';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

function ExplorePage() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { posts } = useSelector(state => state.post);

    return (
        <div className='explore-posts'>
            <div className='input'>
                <input type='text' value={query} placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                {
                    searchResults.length > 0 && <div className='search-results'>

                    </div>
                }
            </div>
            {
                posts.map((post, index) => (
                    <div className='explore-post' key={index}>

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

export default ExplorePage
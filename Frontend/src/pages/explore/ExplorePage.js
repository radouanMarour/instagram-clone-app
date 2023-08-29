import React, { useState } from 'react';
import './ExplorePage.scss';
import defaultPostImg from '../../images/computer.jpg';

function ExplorePage() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className='explore-posts'>
            <div className='input'>
                <input type='text' value={query} placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                {
                    searchResults.length > 0 && <div className='search-results'>

                    </div>
                }
            </div>
            <div className='explore-post'>
                <a href="#"><img src={defaultPostImg} alt="" /></a>
            </div>
            <div className='explore-post'>
                <a href="#"><img src={defaultPostImg} alt="" /></a>
            </div>
            <div className='explore-post'>
                <a href="#"><img src={defaultPostImg} alt="" /></a>
            </div>
            <div className='explore-post'>
                <a href="#"><img src={defaultPostImg} alt="" /></a>
            </div>
            <div className='explore-post'>
                <a href="#"><img src={defaultPostImg} alt="" /></a>
            </div>
        </div>
    )
}

export default ExplorePage
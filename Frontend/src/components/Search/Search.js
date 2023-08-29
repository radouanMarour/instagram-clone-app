import React, { useState } from 'react';
import './Search.scss';

function Search() {
    const [query, setQuery] = useState("");

    return (
        <div className='search'>
            <h2>Search</h2>
            <input
                type='text'
                value={query}
                placeholder='search'
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className='search-results'>

            </div>
        </div>
    )
}

export default Search
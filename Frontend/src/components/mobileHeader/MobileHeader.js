import React, { useState } from 'react';
import './MobileHeader.scss';
import Logo from '../../images/logo.png';
import { AiOutlineHeart } from 'react-icons/ai';
import MakeLink from '../makeLink/MakeLink';
import { Link } from 'react-router-dom';



function MobileHeader() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className='mobile-header'>
            <img src={Logo} alt="" />
            <div className='input'>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder='Search'
                />
                <Link to="#notifications"><AiOutlineHeart /></Link>
            </div>
            {
                searchResults.length > 0 && <div className='search-results'>

                </div>
            }
        </div>
    )
}

export default MobileHeader
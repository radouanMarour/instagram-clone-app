import React, { useEffect, useState } from 'react';
import './Search.scss';
import { UserPhoto } from '../../icons';
import { searchUsers } from '../../apis/userApi';

function Search({ setSearchOpen }) {
    const [query, setQuery] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const { data } = await searchUsers(query);
                if (data.users) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.log(error.response.data.error);
            }
        }
        fetchResults();
    }, [query])

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
                {
                    users?.map((user, index) => (
                        <div className='result' key={index} onClick={() => setSearchOpen(false)}>
                            <UserPhoto
                                width={45}
                                height={45}
                                profilePhoto={user.profilePhoto}
                                userName={user.userName}
                            />
                            <p>
                                <strong>{user.userName}</strong>
                                <br />
                                {user.fullName} . {user.followers.length} followers
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Search
import React, { useEffect, useState } from 'react';
import './MobileHeader.scss';
import Logo from '../../images/logo.png';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { UserPhoto } from '../../icons';
import { searchUsers } from '../../apis/userApi';
import Notifications from '../Notifications/Notifications';

function MobileHeader() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [openNotif, setOpenNotif] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (query === "") return;
            try {
                const { data } = await searchUsers(query);
                if (data.users) {
                    setSearchResults(data.users);
                }
            } catch (error) {
                console.log(error.response.data.error);
            }
        }
        fetchResults();
    }, [query])

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
                <Link to="" onClick={() => setOpenNotif(p => !p)}><AiOutlineHeart /></Link>
            </div>
            {
                query && <div className='search-results'>
                    {
                        searchResults.map((user, index) => (
                            <div className='result' key={index}>
                                <UserPhoto
                                    width={45}
                                    height={45}
                                    fontSize={"3rem"}
                                    profilePhoto={user?.profilePhoto}
                                    userName={user?.userName}
                                />
                                <p>
                                    <strong>{user?.userName}</strong>
                                    <br />
                                    {user?.fullName} . {user?.followers.length} followers
                                </p>
                            </div>
                        ))
                    }
                </div>
            }
            {openNotif && <Notifications mobile={true} />}
        </div>
    )
}

export default MobileHeader
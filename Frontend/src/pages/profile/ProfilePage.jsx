import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiUserPlus } from 'react-icons/bi';
import './ProfilePage.scss';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import { Link, useParams, } from 'react-router-dom';
import { getUser } from '../../apis/userApi';
import { BsGearWide } from 'react-icons/bs'
import FollowButton from '../../components/FollowButton/FollowButton';
import { UserPhoto } from '../../icons';
import OptionsModel from '../../components/OptionsModel/OptionsModel';
import { Grid } from 'react-loader-spinner';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [openOptions, seOpenOptions] = useState(false);
    const [update, setUpdate] = useState(true);
    const { username } = useParams();
    const currentUser = useSelector(state => state.auth.user);
    // const users = useSelector(state => state.user.users);



    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await getUser(username);
            console.log(data)
            setUser(data.user);
        }
        fetchUser();
    }, [username, update]);

    const style = {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    if (!user) {
        return <div style={style}><Grid
            height="300"
            width="300"
            color="#bdbdbd"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /></div>
    }

    return (
        <div className='profile'>
            <div className='profile-header'>
                <UserPhoto
                    profilePhoto={user.profilePhoto}
                    userName={user.userName}
                    width={150}
                    height={150}
                    fontSize={"10rem"}
                />
                <div className='profile-info'>
                    <div className='profile-info-actions'>
                        <span>{user.userName}</span>
                        {
                            username !== currentUser.userName ? <>
                                <span><FollowButton
                                    userFollowers={user.followers}
                                    userId={user._id}
                                    setUpdate={setUpdate}
                                /></span>
                                {/* <button>Message</button> */}
                                <button><BiUserPlus /></button>
                            </> :
                                <>
                                    <button><Link to="/accounts/edit">Edit Profile</Link></button>
                                    {/* <button>View Archive</button> */}
                                    <button className='dots' onClick={() => seOpenOptions(true)}>
                                        <BsGearWide />
                                    </button>
                                </>
                        }
                    </div>
                    <div className='profile-info-stats'>
                        <span><strong>{user.posts.length}</strong> posts</span>
                        <a href="#followers">
                            <strong>{user.followers.length}</strong>
                            followers
                        </a>
                        <a href="#following">
                            <strong>{user.following.length}</strong>
                            following
                        </a>
                    </div>
                    <div className='profile-info-bio'>
                        <p>
                            {user.bio}
                        </p>
                    </div>
                </div>
            </div>
            <ProfileTab user={user} />
            {openOptions && <OptionsModel seOpenOptions={seOpenOptions} />}
        </div>
    )
}

export default ProfilePage
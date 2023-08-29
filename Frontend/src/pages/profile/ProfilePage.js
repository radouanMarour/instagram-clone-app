import React from 'react';
import defaultImg from '../../images/default-user-image.jpg';
import { BiUserPlus } from 'react-icons/bi';
import './ProfilePage.scss';
import ProfileTab from '../../components/ProfileTab/ProfileTab';


function ProfilePage() {
    return (
        <div className='profile'>
            <div className='profile-header'>
                <img src={defaultImg} alr="" className='profile-image' />
                <div className='profile-info'>
                    <div className='profile-info-actions'>
                        <span>username</span>
                        <button>Following</button>
                        <button>Message</button>
                        <button><BiUserPlus /></button>
                        <button className='dots'>...</button>
                    </div>
                    <div className='profile-info-stats'>
                        <span><strong>38</strong> posts</span>
                        <a href="#followers"><strong>28.5K</strong> followers</a>
                        <a href="#following"><strong>1,458</strong> following</a>
                    </div>
                    <div className='profile-info-bio'>
                        <p>
                            Rim | Backend Developer
                            Digital creator
                            🖥️ Tech, coding and motivation
                            📍 Paris 🥐
                            💌 femmedetech.contact@gmail.com
                        </p>
                    </div>
                </div>
            </div>
            <ProfileTab />
        </div>
    )
}

export default ProfilePage
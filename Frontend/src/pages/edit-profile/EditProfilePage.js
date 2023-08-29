import React, { useState } from 'react';
import './EditProfilePage.scss';
import { Link } from 'react-router-dom';
import MetaLogo from '../../images/meta-logo.png';
import DefaultUser from '../../images/default-user-image.jpg';

function EditProfilePage() {
    const [name, setName] = useState("")
    const [website, setWebsite] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    return (
        <div className='edit-profile'>
            <div className='edit-profile-header'>
                <p>Setting</p>
            </div>
            <div className='edit-profile-content'>
                <div className='edit-profile-content-left'>
                    <img src={MetaLogo} alt="" />
                    <Link to="#" className='active'>Edit Profile</Link>
                    <Link to="#">Edit Profile</Link>
                    <Link to="#">Edit Profile</Link>
                    <Link to="#">Edit Profile</Link>
                    <Link to="#">Edit Profile</Link>
                </div>
                <div className='edit-profile-content-right'>
                    <p>Edit Profile</p>
                    <div className='edit-info'>
                        <div className='edit-info-photo'>
                            <img src={DefaultUser} alt="" />
                            <p>Useename<br /><span>Change Profile Photo</span></p>
                        </div>
                        <form>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type='text'
                                    id='name'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor='website'>Website</label>
                                <input
                                    type='text'
                                    id='website'
                                    value={website}
                                    onChange={e => setWebsite(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor='bio'>Bio</label>
                                <textarea
                                    cols='10'
                                    rows='5'
                                    id='bio'
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor='phone-number'>Phone Number</label>
                                <input
                                    type='tel'
                                    id='phone'
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage
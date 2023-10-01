import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EditProfilePage.scss';
import { Link, useNavigate } from 'react-router-dom';
import MetaLogo from '../../images/meta-logo.png';
import DefaultUser from '../../images/default-user-image.jpg';
import api from '../../client';
import { editUser } from '../../apis/userApi';
import { setUser } from '../../redux/slices/authSlice';
import { UserPhoto } from '../../icons';
import { RotatingLines } from 'react-loader-spinner';

function EditProfilePage() {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const [fullName, setFullName] = useState(user.fullName)
    const [userName, setUserName] = useState(user.userName)
    const [bio, setBio] = useState(user.bio)
    const [email, setEmail] = useState(user.email)
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpload = async e => {
        const formData = new FormData();
        formData.append('photo', e.target.files[0]);
        try {
            setUploading(true)
            const { data: { photo } } = await api.post("/api/uploads", formData);
            if (photo) {
                const { data } = await editUser(token, { ...user, profilePhoto: photo });
                dispatch(setUser({ user: data.user, token: user.token }));
                setUploading(false)
                console.log(data);
            }
        } catch (error) {
            setUploading(false)
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            fullName,
            userName,
            email,
            bio
        }
        try {
            const { data } = await editUser(token, body);
            dispatch(setUser({ user: data.user, token: token }));
            if (data.user) {
                navigate(`/${data.user.userName}`);
            }
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <div className='edit-profile'>
            <div className='edit-profile-header'>
                <p>Setting</p>
            </div>
            <div className='edit-profile-content'>
                <div className='edit-profile-content-left'>
                    <img src={MetaLogo} alt="" />
                    <Link to='/accounts/edit' className='active'>Edit Profile</Link>
                </div>
                <div className='edit-profile-content-right'>
                    <p>Edit Profile</p>
                    <div className='edit-info'>
                        <div className='edit-info-photo'>
                            {
                                uploading ?
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="20"
                                        visible={true}
                                    /> :
                                    <UserPhoto
                                        profilePhoto={user.profilePhoto}
                                        userName={user.userName}
                                    />
                            }
                            <p>{user.userName}</p>
                            <label htmlFor='photo'>Change Profile Photo</label>
                            <input
                                type='file'
                                name="photo"
                                id="photo"
                                onChange={handleUpload}
                                hidden
                            />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='name'>Full Name</label>
                                <input
                                    type='text'
                                    id='name'
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor='username'>Username</label>
                                <input
                                    type='text'
                                    id='username'
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                />
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
                                <label htmlFor='bio'>Bio</label>
                                <textarea
                                    cols='10'
                                    rows='5'
                                    id='bio'
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                ></textarea>
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
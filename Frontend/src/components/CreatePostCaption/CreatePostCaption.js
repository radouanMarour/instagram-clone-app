import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CreatePostCaption.scss';
import defaultImg from '../../images/default-user-image.jpg';
import { Link } from 'react-router-dom';
import { addCaption } from '../../redux/slices/createPostSlice';
import { UserPhoto } from '../../icons';

function CreatePostCaption() {
    const [caption, setCaption] = useState("")
    const postImage = useSelector(state => state.createPost.post.image);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleChange = e => {
        setCaption(e.target.value);
        dispatch(addCaption(e.target.value));
    }

    return (
        <div className='create-post-caption'>
            <div className='post-photo'>
                <img src={`http://localhost:5000/uploads/${postImage}`} alt='' />
            </div>
            <div className='post-caption'>
                <div className='user-post'>
                    <UserPhoto profilePhoto={user.profilePhoto} userName={user.userName} />
                    <p><strong>{user.userName}</strong></p>
                </div>
                <textarea
                    value={caption}
                    onChange={handleChange}
                    cols={10}
                    rows={10}
                    placeholder='Write a caption'></textarea>
            </div>
        </div>
    )
}

export default CreatePostCaption
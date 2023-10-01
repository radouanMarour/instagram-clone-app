import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CreatePost.scss';
import { GrFormClose } from 'react-icons/gr';
import SelectPostPhoto from '../SelectPostPhoto/SelectPostPhoto'
import DisplayPostPhoto from '../DisplayPostPhoto/DisplayPostPhoto'
import CreatePostCaption from '../CreatePostCaption/CreatePostCaption'
import { createPost } from '../../apis/postApi';
import { fetchPosts } from '../../redux/slices/postSlice';
import { LoginSpinner } from '../../icons';
import { useNavigate } from 'react-router-dom';

function CreatePost({ closeCreatePost }) {
    const [selectPhoto, setSelectPhoto] = useState(true);
    const [displayPhoto, setDisplayPhoto] = useState(false);
    const [createCaption, setCreateCaption] = useState(false);
    const [loading, setLoading] = useState(false);
    const [maxWidth, setMaxWidth] = useState(452);
    const dispatch = useDispatch();
    const postInfo = useSelector(state => state.createPost.post);
    const token = useSelector(state => state.auth.token);
    const navigate = useDispatch();

    const shwoDispalyPhoto = () => {
        setSelectPhoto(false)
        setDisplayPhoto(true);
    }
    const shwoCreateCaption = () => {
        setDisplayPhoto(false);
        setCreateCaption(true);
        setMaxWidth("60%")
    }
    const sharePost = async () => {
        try {
            setLoading(true)
            const { data } = await createPost(token, postInfo);
            if (data) {
                dispatch(fetchPosts());
                navigate('/')
                setLoading(false)

            }
            closeCreatePost();
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    return (
        <div className='create-post-wrapper'>
            <GrFormClose onClick={closeCreatePost} />
            <div className='create-post-content' style={{ maxWidth: maxWidth }}>
                <div className='create-post-content-header'>
                    <p>Create new post</p>
                    {displayPhoto && <button onClick={shwoCreateCaption}>Next</button>}
                    {createCaption && <button onClick={sharePost}>
                        {loading ? <LoginSpinner /> : "Share"}
                    </button>
                    }
                </div>
                {selectPhoto && <SelectPostPhoto shwoDispalyPhoto={shwoDispalyPhoto} />}
                {displayPhoto && <DisplayPostPhoto />}
                {createCaption && <CreatePostCaption />}
            </div>
        </div>
    )
}

export default CreatePost
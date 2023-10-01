import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PostActions.scss';
import { LuSend } from 'react-icons/lu'
import { FaRegComment } from 'react-icons/fa'
import { likePost, savePost } from '../../apis/postApi';
import { fetchPosts } from '../../redux/slices/postSlice';
import { LikeIcon, SaveIcon } from '../../icons';
import { Link } from 'react-router-dom';
import { setUser } from '../../redux/slices/authSlice';

function PostActions({ postId, likes, userId, setUpdate }) {
    const { user, token } = useSelector(state => state.auth);
    const isLiked = likes.includes(user.id);
    const isSaved = user.saved.includes(postId);
    const dispatch = useDispatch();

    const handleLike = async () => {
        if (userId === user.id) return;
        try {
            const response = await likePost(token, postId);
            dispatch(fetchPosts());
            setUpdate(p => !p);
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSave = async () => {
        if (userId === user.id) return;
        try {
            const { data } = await savePost(token, postId);
            dispatch(fetchPosts());
            dispatch(setUser({ user: data.user, token }));
            setUpdate(p => !p);
            console.log(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='post-actions'>
            <div className='actions'>
                <span onClick={handleLike}><LikeIcon isLiked={isLiked} /></span>
                <span><Link to={`/p/${postId}`}><FaRegComment /></Link></span>
                <span><LuSend /></span>
                <span onClick={handleSave}><SaveIcon isSaved={isSaved} /></span>
            </div>
            <p className='likes'>{likes.length} Likes</p>
        </div>
    )
}

export default PostActions
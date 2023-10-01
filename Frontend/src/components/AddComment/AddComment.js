import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AddComment.scss';
import { commentPost } from '../../apis/postApi';
import { fetchPosts } from '../../redux/slices/postSlice';
import { LoginSpinner } from '../../icons';

function AddComment({ postId, setUpdate }) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await commentPost(token, postId, comment);
            if (data.message) {
                dispatch(fetchPosts());
                setUpdate(p => !p)
                setLoading(false)
                setComment("");
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='add-comment-form'>
            <input
                type='text'
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder='Add a comment...'
            />
            <button type='submit' disabled={comment ? 0 : 1}>
                {loading ? <LoginSpinner /> : "Post"}
            </button>
        </form>
    )
}

export default AddComment
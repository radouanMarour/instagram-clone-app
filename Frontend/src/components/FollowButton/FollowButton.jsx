import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './FollowButton.scss';
import { followUser } from '../../apis/userApi';
import { fetchUsers } from '../../redux/slices/userSlice';
import { FollowSpinner } from '../../icons';
import { fetchPosts } from '../../redux/slices/postSlice';

function FollowButton({ userFollowers, userId, setUpdate }) {
    const { user, token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const isFollowed = userFollowers.includes(user.id);

    const handleFollow = async () => {
        try {
            setLoading(true)
            const { data } = await followUser(token, userId);
            if (data.message) {
                dispatch(fetchUsers());
                dispatch(fetchPosts());
                setUpdate(p => !p);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    if (loading) {
        return (
            <button className='follow-btn'>
                <FollowSpinner />
            </button>
        )
    }

    return (
        <button className='follow-btn' onClick={handleFollow}>
            {
                isFollowed ?
                    <span style={{ color: "#bdbdbd" }}>Following</span> :
                    "Follow"
            }
        </button>
    )
}

export default FollowButton
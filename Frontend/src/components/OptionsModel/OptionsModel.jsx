import React from 'react';
import './OptionsModel.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/slices/authSlice';
import { deletePost } from '../../apis/postApi';
import { fetchPosts } from '../../redux/slices/postSlice';
import FollowButton from '../FollowButton/FollowButton';
function OptionsModel({ seOpenOptions, type, post, setUpdate }) {
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth);

    const logout = () => {
        dispatch(clearUser());
    }

    const removePost = async () => {
        try {
            const { data } = await deletePost(post._id, token);
            if (data) {
                dispatch(fetchPosts());
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (type === "postOption" && post.user._id === user.id) {
        return (
            <div className='options-wrapper'>
                <div className='options'>
                    <Link
                        to={""}
                        style={{ color: "#ed4956" }}
                        onClick={removePost}
                    >Remove post</Link>
                    <Link to={`/p/${post._id}`} >Go to post</Link>
                    <Link to={""} onClick={() => seOpenOptions(false)}>Cancel</Link>
                </div>
            </div>
        )
    }
    if (type === "postOption" && post.user._id !== user.id) {
        return (
            <div className='options-wrapper'>
                <div className='options'>
                    <Link to={""} style={{ color: "#ed4956" }}>
                        <FollowButton
                            userFollowers={post.user.followers}
                            userId={post.user._id}
                            setUpdate={setUpdate}
                        />
                    </Link>
                    <Link to={`/p/${post._id}`} >Go to post</Link>
                    <Link to={""} onClick={() => seOpenOptions(false)}>Cancel</Link>
                </div>
            </div>
        )
    }

    return (
        <div className='options-wrapper'>
            <div className='options'>
                <Link to={"/"}>Notifications</Link>
                <Link to={""} onClick={logout}>Log out</Link>
                <Link to={""} onClick={() => seOpenOptions(false)}>Cancel</Link>
            </div>
        </div>
    )
}

export default OptionsModel
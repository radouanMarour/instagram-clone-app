import React, { useEffect, useState } from 'react'
// import FriendSuggestion from '../../components/FriendSuggestion/FriendSuggestion'
// import Post from '../../components/Post/Post'
import StorySlider from '../../components/StorySlider/StorySlider'
import MobileHeader from '../../components/mobileHeader/MobileHeader';
import './FeedPage.scss';
import { fetchPosts } from '../../redux/slices/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../apis/userApi';
import { UserPhoto } from '../../icons';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../redux/slices/userSlice';
import PostSkeleton from '../../components/Post/PostSkeleton';
import FriendSkeleton from '../../components/FriendSuggestion/LoadingSkeleton';
const Post = React.lazy(() => import('../../components/Post/Post'));
const FriendSuggestion = React.lazy(() => import('../../components/FriendSuggestion/FriendSuggestion'));

function FeedPage() {
    const { posts } = useSelector(state => state.post);
    const { users } = useSelector(state => state.user);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUsers());
    }, [])

    const myUsers = users.filter(usr => usr._id !== user.id).splice(0, 5);

    return (
        <div className='feed'>
            <MobileHeader />
            <div className='feed-posts'>
                <StorySlider />
                <div className='posts'>
                    {
                        posts?.map((post, index) => (
                            <React.Suspense fallback={<PostSkeleton />}>
                                <Post post={post} key={index} />
                            </React.Suspense>
                        ))
                    }
                </div>
            </div>
            <div className='friend-suggestions'>
                <div className='friend' style={{ padding: "0 0.5rem", margin: "1rem 0" }}>
                    <UserPhoto profilePhoto={user.profilePhoto} userName={user.userName} />
                    <p>{user.userName} <br /><span>{user.fullName}</span></p>
                </div>
                <p>Suggested for you</p>
                {
                    myUsers.map(user => (
                        <React.Suspense fallback={<FriendSkeleton />}>
                            <FriendSuggestion key={user._id} user={user} />
                        </React.Suspense>
                    ))
                }
            </div>
        </div>
    )
}

export default FeedPage
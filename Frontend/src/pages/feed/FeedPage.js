import React from 'react'
import FriendSuggestion from '../../components/FriendSuggestion/FriendSuggestion'
import Post from '../../components/Post/Post'
import StorySlider from '../../components/StorySlider/StorySlider'
import MobileHeader from '../../components/mobileHeader/MobileHeader';
import './FeedPage.scss';

function FeedPage() {
    return (
        <div className='feed'>
            <MobileHeader />
            <div className='feed-posts'>
                <StorySlider />
                <div className='posts'>
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
            <div className='friend-suggestions'>
                <div>
                    <FriendSuggestion />
                </div>
                <p>Suggested for you</p>
                <FriendSuggestion />
                <FriendSuggestion />
                <FriendSuggestion />
            </div>
        </div>
    )
}

export default FeedPage
import React from 'react';
import './PostActions.scss';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { LuSend } from 'react-icons/lu'
import { FaRegComment } from 'react-icons/fa'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'

function PostActions() {
    return (
        <div className='post-actions'>
            <div className='actions'>
                <span><MdFavoriteBorder /></span>
                <span><FaRegComment /></span>
                <span><LuSend /></span>
                <span><MdBookmarkBorder /></span>
            </div>
            <p className='likes'>77 Likes</p>
        </div>
    )
}

export default PostActions
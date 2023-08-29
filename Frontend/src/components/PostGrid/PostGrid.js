import React from 'react';
import './PostGrid.scss';
import defaultPostImg from '../../images/computer.jpg';
function PostGrid() {
    return (
        <div className='post-grid'>
            <div className='post-grid-item'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='post-grid-item'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='post-grid-item'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='post-grid-item'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='post-grid-item'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='post-grid-item'>
                <img src={defaultPostImg} alt="" />
            </div>
        </div>
    )
}

export default PostGrid
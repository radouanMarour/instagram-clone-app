import React from 'react';
import './ReelsPage.scss';
import defaultPostImg from '../../images/computer.jpg';

function ReelsPage() {
    return (
        <div className='reels'>
            <div className='reel'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='reel'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='reel'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='reel'>
                <img src={defaultPostImg} alt="" />
            </div>
            <div className='reel'>
                <img src={defaultPostImg} alt="" />
            </div>
        </div>
    )
}

export default ReelsPage
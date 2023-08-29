import React from 'react';
import './DisplayPostPhoto.scss';
import defaultPostImg from '../../images/computer.jpg';

function DisplayPostPhoto() {
    return (
        <div className='post-photo'>
            <img src={defaultPostImg} alt='' />
        </div>
    )
}

export default DisplayPostPhoto
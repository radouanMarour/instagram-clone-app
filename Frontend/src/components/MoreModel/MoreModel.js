import React, { useState } from 'react'
import './MoreModel.scss';
import MakeLink from '../makeLink/MakeLink';
import { GoHome } from 'react-icons/go';



function MoreModel({ setModelOpen }) {

    const closeModel = () => setModelOpen(false);

    return (
        <div className='more-model'>
            <nav>
                <ul>
                    <li onClick={closeModel}><MakeLink to="/accounts/edit" text="Settings" icon={<GoHome />} /></li>
                    <li onClick={closeModel}><MakeLink text="Saved" icon={<GoHome />} /></li>
                    <li onClick={closeModel}><MakeLink text="Log out" icon={<GoHome />} /></li>
                </ul>
            </nav>
        </div>
    )
}

export default MoreModel
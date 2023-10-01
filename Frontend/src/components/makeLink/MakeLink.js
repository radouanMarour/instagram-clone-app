import React from 'react'
import { Link } from 'react-router-dom';
import './MakeLink.scss';

function MakeLink({ to, text, icon }) {
    const Icon = icon;
    return (
        <Link to={to} className="link">
            {icon}
            <span>{text}</span>
        </Link>
    )
}

export default MakeLink
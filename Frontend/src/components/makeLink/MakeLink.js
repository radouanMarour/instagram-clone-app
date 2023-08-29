import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './MakeLink.scss';

function MakeLink({ to, text, icon }) {
    const Icon = icon;
    const path = useLocation().pathname;
    return (
        <Link to={to} className={path === to ? "link active" : "link"}>
            {icon}
            <span>{text}</span>
        </Link>
    )
}

export default MakeLink
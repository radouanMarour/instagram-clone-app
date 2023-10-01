import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './MoreModel.scss';
import MakeLink from '../makeLink/MakeLink';
import { BsGearWide } from 'react-icons/bs';
import { MdBookmarkBorder } from 'react-icons/md'
import { clearUser } from '../../redux/slices/authSlice';



function MoreModel({ setModelOpen }) {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const closeModel = () => setModelOpen(false);
    const logout = () => {
        dispatch(clearUser());
        closeModel();
    }

    return (
        <div className='more-model'>
            <nav>
                <ul>
                    <li onClick={closeModel}><MakeLink to="/accounts/edit" text="Settings" icon={<BsGearWide />} /></li>
                    <li onClick={closeModel}><MakeLink to={`/${user.userName}/saved`} text="Saved" icon={<MdBookmarkBorder />} /></li>
                    <li onClick={logout}><MakeLink text="Log out" /></li>
                </ul>
            </nav>
        </div>
    )
}

export default MoreModel
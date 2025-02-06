import React, { useEffect, useState } from 'react';
import './Notifications.scss';
import defaultImg from '../../images/default-user-image.jpg';
import { Link } from 'react-router-dom';
import { getNotifications } from '../../apis/userApi';
import { useSelector } from 'react-redux';
import FollowButton from '../FollowButton/FollowButton';
import { UserPhoto } from '../../icons';

function Notifications({ mobile }) {
    const [notifications, setNotifications] = useState([]);
    const [update, setUpdate] = useState(false);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const { data } = await getNotifications(user.id);
                if (data) {
                    setNotifications(data.notifications);
                    // console.log(data.notifications);
                }
            } catch (error) {
                console.log(error.response.data);
            }
        }
        fetchNotification();
    }, [update])

    // if (notifications.length === 0) {
    //     return <h1>Loading...</h1>
    // }

    const style = {
        left: mobile && window.innerWidth - 300,
        top: mobile && "60px",
        height: mobile && "400px"
    }

    return (
        <div className='notifications' style={style}>
            <h2>Notifications</h2>
            <div className='notification'>
                {
                    notifications.map(notif => (<div>
                        <Link to={`/${notif.sender.userName}`}>
                            <UserPhoto profilePhoto={notif.sender.profilePhoto} />
                            <span>
                                <strong>{notif.sender.userName}</strong>
                                {notif.content.substring(notif.sender.userName.length, notif.content.length)}
                            </span>
                        </Link>
                        {/* <FollowButton
                            userFollowers={notif.reciever.followers}
                            userId={notif.sender._id}
                            setUpdate={setUpdate}
                        /> */}
                    </div>))
                }
            </div>
        </div>
    )
}

export default Notifications
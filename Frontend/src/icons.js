import { GoHome, GoHomeFill } from 'react-icons/go';
import { MdOutlineExplore, MdExplore, MdOutlineAddBox, MdAddBox } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsSendFill, BsSend } from 'react-icons/bs'
import { MdBookmark, MdBookmarkBorder, } from 'react-icons/md'
import reelOutline from './images/reelOtline.png'
import reelFill from './images/reelFill.png'
import { Link } from 'react-router-dom';
import { Oval, RotatingLines } from 'react-loader-spinner';
import avatar from './images/default-user-image.jpg';

export const LikeIcon = ({ isLiked }) => {
    return isLiked ? <AiFillHeart style={{ color: "#ff3040" }} /> : <AiOutlineHeart />
}
export const SaveIcon = ({ isSaved }) => {
    return isSaved ? <MdBookmark style={{ color: "#000" }} /> : <MdBookmarkBorder />
}
export const HomeIcon = ({ path, searchOpen, notifOpen }) => {
    return (path === "/" && (!searchOpen && !notifOpen)) ? <GoHomeFill /> : <GoHome />
}
export const SearchIcon = ({ searchOpen }) => {
    return searchOpen ? <FaSearch /> : <BiSearch />
}
export const ExploreIcon = ({ path, searchOpen, notifOpen }) => {
    return path === "/explore" && (!searchOpen && !notifOpen) ? <MdExplore /> : <MdOutlineExplore />
}
export const ReelsIcon = ({ path, searchOpen, notifOpen }) => {
    return path === "/reels" && (!searchOpen && !notifOpen) ?
        <img src={reelFill} alt="" width={20} height={20} /> :
        <img src={reelOutline} alt="" width={20} height={20} />
}
export const SendIcon = ({ messageOpen }) => {
    return messageOpen ? <BsSendFill /> : <BsSend />
}
export const CreateIcon = ({ createPostOpen }) => {
    return createPostOpen ? <MdAddBox /> : <MdOutlineAddBox />
}
export const NotifIcon = ({ notifOpen }) => {
    return notifOpen ? <AiFillHeart /> : <AiOutlineHeart />
}
export const UserPhoto = ({ profilePhoto, userName, width, height }) => {
    return <Link to={`/${userName}`} >{profilePhoto ? <img
        src={`https://insta-clone-dxtn.onrender.com/${profilePhoto}`}
        alt=""
        width={width || 40}
        height={height || 40}
        style={{ borderRadius: "50%" }}
    /> :
        <img
            src={avatar}
            alt=''
            width={width || 40}
            height={height || 40}
            style={{ borderRadius: "50%" }}
        />
    }</Link>
}
export const LoginSpinner = () => (
    <Oval
        height={17}
        width={17}
        color="#ffffff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#f3f3f3"
        strokeWidth={5}
        strokeWidthSecondary={5}

    />
)

export const FollowSpinner = () => (
    <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
        visible={true}
    />
)
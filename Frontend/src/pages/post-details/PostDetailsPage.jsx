import React, { useEffect, useState } from 'react';
import "./PostDetailsPage.scss";
import defaultPostImg from '../../images/computer.jpg';
import defaultImg from '../../images/default-user-image.jpg';
import { Link, useParams } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import PostActions from '../../components/PostActions/PostActions';
import AddComment from '../../components/AddComment/AddComment';
import OptionsModel from '../../components/OptionsModel/OptionsModel';
import { GrFormClose } from 'react-icons/gr';
import { getPost } from '../../apis/postApi';
import { UserPhoto } from '../../icons';
import PostDetailsSkeleton from './PostDetailsSkeleton';

function PostDetailsPage() {
    const [post, setPost] = useState(null);
    const [update, setUpdate] = useState(true);
    const [openOptions, seOpenOptions] = useState(false);
    const { postId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await getPost(postId);
            if (data) {
                console.log(data);
                setPost(data.post);
            }
        }
        fetchPost();
    }, [postId, update]);

    if (!post) {
        return <PostDetailsSkeleton />
    }

    return (
        <div className='post-details'>
            <Link to="/" className='close-icon'><GrFormClose /></Link>
            <div className='post-details-content'>
                <img className='post-img' src={`${post.image}`} />
                <div className='post-info'>
                    <div className='post-info-header'>
                        <div className='post-info-user'>
                            <UserPhoto profilePhoto={post.user.profilePhoto} userName={post?.user.userName} />
                            <p>{post?.user.userName} <br /><span>{post.user.fullName}</span></p>
                        </div>
                        <button className='three-btn' onClick={() => seOpenOptions(true)}>...</button>
                    </div>
                    <div className='comments'>
                        <div className='caption' style={{
                            marginBottom: "1.5rem",
                            fontSize: "0.9rem",
                            margin: "0 1rem"
                        }}>
                            <p>{post.caption}</p>
                        </div>
                        {
                            post.comments.map(comment => {
                                return <Comment comment={comment} />
                            })
                        }
                    </div>
                    <div className='reactions'>
                        <PostActions
                            likes={post.likes}
                            postId={post._id}
                            userId={post.user._id}
                            setUpdate={setUpdate}
                        />
                        <AddComment
                            postId={post._id}
                            setUpdate={setUpdate}
                        />
                    </div>
                </div>
            </div>
            {
                openOptions && <OptionsModel
                    seOpenOptions={seOpenOptions}
                    type="postOption"
                    post={post}
                    setUpdate={setUpdate}
                />
            }
        </div>
    )
}

export default PostDetailsPage
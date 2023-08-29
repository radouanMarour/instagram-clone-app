import React, { useState } from 'react';
import './CreatePost.scss';
import { GrFormClose } from 'react-icons/gr';
import SelectPostPhoto from '../SelectPostPhoto/SelectPostPhoto'
import DisplayPostPhoto from '../DisplayPostPhoto/DisplayPostPhoto'
import CreatePostCaption from '../CreatePostCaption/CreatePostCaption'

function CreatePost({ closeCreatePost }) {
    const [selectPhoto, setSelectPhoto] = useState(true);
    const [displayPhoto, setDisplayPhoto] = useState(false);
    const [createCaption, setCreateCaption] = useState(false);

    const shwoCreateCaption = () => {
        setDisplayPhoto(false);
        setCreateCaption(true)
    }

    return (
        <div className='create-post-wrapper'>
            <GrFormClose onClick={closeCreatePost} />
            <div className='create-post-content'>
                <button onClick={shwoCreateCaption}>Next</button>
                {selectPhoto && <SelectPostPhoto />}
                {displayPhoto && <DisplayPostPhoto />}
                {createCaption && <CreatePostCaption />}
            </div>
        </div>
    )
}

export default CreatePost
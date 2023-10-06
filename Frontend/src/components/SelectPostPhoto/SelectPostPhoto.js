import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../client';
import './SelectPostPhoto.scss';
import { addImage } from '../../redux/slices/createPostSlice';
import { RotatingLines } from 'react-loader-spinner';

function SelectPostPhoto({ shwoDispalyPhoto }) {
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch();

    const handleChange = e => {
        const formData = new FormData();
        formData.append('photo', e.target.files[0]);
        setUploading(true)
        api.post("/api/uploads", formData)
            .then(response => {
                dispatch(addImage(response.data.photo));
                setUploading(false)
                shwoDispalyPhoto();
            })
            .catch(err => { console.log(err); setUploading(false) });
    }

    return (
        <div className='select-post-photo'>
            {
                uploading ? <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="150"
                    visible={true}
                /> :
                    <form>
                        <p>Add photos and videos to create a new post</p>
                        <label htmlFor='photo'>
                            Select from device
                        </label>
                        <input
                            onChange={handleChange}
                            type='file'
                            id="photo"
                            name="photo"
                            hidden
                        />
                    </form>
            }
        </div>
    )
}

export default SelectPostPhoto
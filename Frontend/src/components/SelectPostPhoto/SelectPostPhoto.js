import React from 'react';
import { useDispatch } from 'react-redux';
import api from '../../client';
import './SelectPostPhoto.scss';
import { addImage } from '../../redux/slices/createPostSlice';

function SelectPostPhoto({ shwoDispalyPhoto }) {
    const dispatch = useDispatch();

    const handleChange = e => {
        const formData = new FormData();
        formData.append('photo', e.target.files[0]);
        api.post("/api/uploads", formData)
            .then(response => {
                dispatch(addImage(response.data.photo));
                shwoDispalyPhoto();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='select-post-photo'>
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
        </div>
    )
}

export default SelectPostPhoto
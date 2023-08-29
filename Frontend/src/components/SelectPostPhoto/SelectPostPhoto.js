import React from 'react';
import './SelectPostPhoto.scss';

function SelectPostPhoto() {
    return (
        <div className='select-post-photo'>
            <p>Create new post</p>
            <form>
                <p>Add photos and videos to create a new post</p>
                <label htmlFor='photo'>
                    Select from device
                </label>
                <input type='file' id="photo" name="photo" hidden />
            </form>
        </div>
    )
}

export default SelectPostPhoto
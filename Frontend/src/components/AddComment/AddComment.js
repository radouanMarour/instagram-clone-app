import React from 'react';
import './AddComment.scss';

function AddComment() {
    return (
        <form className='add-comment-form'>
            <input type='text' value="" placeholder='Add a comment...' />
            <button type='submit'>Post</button>
        </form>
    )
}

export default AddComment
import React from 'react'
import { CgClose } from 'react-icons/cg'
function TagShowItem({ tagItem, removedTag }) {
    return (
        <div className='tag_showing_item  animate__animated animate__fadeInRight'>
            <span>{tagItem.first_name + " " + tagItem.last_name} <i onClick={() => removedTag(tagItem._id)}><CgClose /></i></span>
        </div>
    )
}

export default TagShowItem
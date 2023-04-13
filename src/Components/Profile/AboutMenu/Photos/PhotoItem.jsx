import React from 'react'
import './photos.css'

function PhotoItem({ item, navigateTo }) {

    return (
        <div className='col-lg-2 col-md-3 col-sm-4 col-6 gx-2 gy-2'>
            <div onClick={() => navigateTo()} className="image_items_of_photos">
                <img src={item.secure_url} alt="photos" />
            </div>
        </div>
    )
}

export default PhotoItem
import React from 'react'
import './stories.css'

function Stories({ item }) {
    const { user, image } = item
    return (
        <>
            <div className="stories_items_xx">
                <div className="user_avatar">
                    <img src={`${user.picture}`} alt="user" />
                </div>
                <div className="story">
                    <img src={image} alt="stories" />
                </div>
                <h6>{user.first_name + " " + user.last_name}</h6>
            </div>
        </>
    )
}

export default Stories
import React from 'react'

function TagFriendItems({ friend, addTag }) {
    return (
        <div className='tag_friend_items animate__animated animate__fadeInDown'
            onClick={() => addTag(friend)}
        >
            <div className="image_tag_item">
                <img src={friend.picture} alt="user" />
            </div>
            <div className="name_tag_items">
                <h6>{friend.first_name + " " + friend.last_name}</h6>
            </div>
        </div>
    )
}

export default TagFriendItems
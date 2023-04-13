import React from 'react'
import { useNavigate } from 'react-router-dom'

function Friends({ friend }) {
    const navigate = useNavigate()
    const naviGateTo = () => {
        navigate(`/profile/${friend.username}`)
        window.scrollTo(0, 0)
    }
    return (
        <div onClick={() => naviGateTo()} className='col-4 gx-2 my-1'>
            <div className="images_user_friend_oo">
                <img src={friend.picture} alt="friend" />
            </div>
            <div className="title_name_user_info">
                <h6>{friend.first_name + " " + friend.last_name}</h6>
            </div>
        </div>
    )
}

export default Friends
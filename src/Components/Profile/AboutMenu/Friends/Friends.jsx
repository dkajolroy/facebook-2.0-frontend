import React from 'react'
import './friends.css'
import { useNavigate } from 'react-router-dom'

function Friends({ friends }) {
    const navigate = useNavigate()

    const navigateTo = () => {
        window.scrollTo(0, 0)
        navigate(`/profile/${friends.username}`)
    }
    return (
        <div className="col-lg-2 col-md-3 col-4">
            <div onClick={() => navigateTo()} className='friends_of_about_profile'>
                <div className="user_image_friends_jj">
                    <img src={friends.picture} alt="user" />
                </div>
                <div className="desc_bottom_about_kk">
                    <h6>{friends.first_name + " " + friends.last_name}</h6>
                </div>
            </div>
        </div>
    )
}

export default Friends
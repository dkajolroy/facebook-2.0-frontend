import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { friend_request } from '../../Redux/Actions/UserAction'
function SuggestItem({ friend }) {

    const dispatch = useDispatch()
    const addFriend = (username) => {
        dispatch(friend_request(username))
    }

    const navigate = useNavigate()
    const navigateToProfile = () => {
        navigate(`/profile/${friend.username}`)
        window.scrollTo(0, 0)
    }


    return (
        <div className='col-md-4 col-lg-3 col-6 f_request_xx_friends animate__animated animate__fadeIn'>
            <Toaster
                position="top-center "
                reverseOrder={false}
            />
            <div className="item_ff_xd">
                <div onClick={navigateToProfile} className="images">
                    <img src={friend && friend.picture} alt="user" />
                </div>
                <div className="bottom_info_action_df">
                    <div className="user_name">
                        <h4>{friend && friend.first_name + " " + friend.last_name}</h4>
                    </div>
                    <div className="info_connection">
                        <span>Mutual friends upcoming...</span>
                    </div>
                    <div className="action_suggest_xx">
                        <button onClick={() => addFriend(friend.username)} className="shadow-none btn btn-primary">Add Friend</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestItem
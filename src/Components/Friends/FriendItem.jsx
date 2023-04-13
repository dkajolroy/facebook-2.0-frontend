import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unfriend } from '../../Redux/Actions/UserAction';

function FriendItem({ friend }) {

    // Action Operation Friends
    const dispatch = useDispatch()

    const unfriendHandle = (username) => {
        dispatch(unfriend(username))
    }

    const navigate = useNavigate()
    const navigateToProfile = () => {
        navigate(`/profile/${friend.username}`)
        window.scrollTo(0, 0)
    }



    return (
        <div className='col-md-4 col-lg-3 col-6 f_request_xx_friends animate__animated animate__fadeIn'>

            <div className="item_ff_xd">
                <div onClick={() => navigateToProfile()} className="images">
                    <img src={friend && friend.picture} alt="user" />
                </div>
                <div className="bottom_info_action_df">
                    <div className="user_name">
                        <h4>{friend && friend.first_name + " " + friend.last_name}</h4>
                    </div>
                    <div className="info_connection">
                        <span>Mutual friends upcoming...</span>
                    </div>
                    <div className="action_friends_xx">
                        <button onClick={() => unfriendHandle(friend.username)} className="shadow-none btn btn-primary">Unfriend</button>
                        <button className="shadow-none btn">Block</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendItem
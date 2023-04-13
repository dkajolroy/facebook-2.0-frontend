import React, { useEffect } from 'react'
import './friends.css'
import { BsGearFill } from 'react-icons/bs'
import { FaUserFriends, FaUserPlus, FaUserClock, FaUserEdit, FaUserCog } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { GiBoxUnpacking } from 'react-icons/gi';

function SideBars({ setTab, tab }) {


    return (
        <div className='friends_sideBars_xx'>
            <div className="headers_top">
                <h4>Friends</h4>
                <span><BsGearFill /></span>
            </div>

            <div className="item_all_friends_category_list">
                <div onClick={() => setTab(1)} className={`${tab === 1 && "active_friend_tab"} items_friends_list`}>
                    <div className="logo_heading">
                        <span><FaUserFriends /></span>
                        <h5>Home</h5>
                    </div>
                </div>
                <div onClick={() => setTab(2)} className={`${tab === 2 && "active_friend_tab"} items_friends_list`}>
                    <div className="logo_heading">
                        <span><FaUserEdit /></span>
                        <h5>Friend Requests</h5>
                    </div>
                    <div className="right_arrow_go">
                        <span><IoIosArrowForward /></span>
                    </div>
                </div>
                <div onClick={() => setTab(3)} className={`${tab === 3 && "active_friend_tab"} items_friends_list`}>
                    <div className="logo_heading">
                        <span><FaUserPlus /></span>
                        <h5>Suggestions</h5>
                    </div>
                    <div className="right_arrow_go">
                        <span><IoIosArrowForward /></span>
                    </div>
                </div>
                <div onClick={() => setTab(4)} className={`${tab === 4 && "active_friend_tab"} items_friends_list`}>
                    <div className="logo_heading">
                        <span><FaUserCog /></span>
                        <h5>All Friends</h5>
                    </div>
                    <div className="right_arrow_go">
                        <span><IoIosArrowForward /></span>
                    </div>
                </div>
                <div onClick={() => setTab(5)} className={`${tab === 5 && "active_friend_tab"} items_friends_list`}>
                    <div className="logo_heading">
                        <span><GiBoxUnpacking /></span>
                        <h5>Birthday</h5>
                    </div>
                    <div className="right_arrow_go">
                        <span><IoIosArrowForward /></span>
                    </div>
                </div>
                <div onClick={() => setTab(6)} className={`${tab === 6 && "active_friend_tab"} items_friends_list`}>
                    <div className="logo_heading">
                        <span><FaUserClock /></span>
                        <h5>Custom List</h5>
                    </div>
                    <div className="right_arrow_go">
                        <span><IoIosArrowForward /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBars
import React from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function ProfileMenuBar({ setProfileMenu, profileMenu }) {
    const navigate = useNavigate()
    return (
        <div className='profile_menu_bar_fs'>
            <div className="display_profile_menu_ff">
                <div className="col-lg-10">
                    <ul>
                        <li className={profileMenu == "posts" ? "active" : null} onClick={() => setProfileMenu("posts")}>Posts</li>
                        <li className={profileMenu == "about" ? "active" : null} onClick={() => setProfileMenu("about")}>About</li>
                        <li className={profileMenu == "friends" ? "active" : null} onClick={() => setProfileMenu("friends")}>Friends</li>
                        <li className={profileMenu == "photos" ? "active" : null} onClick={() => setProfileMenu("photos")}>Photos</li>
                        <li className={profileMenu == "videos" ? "active" : null} onClick={() => setProfileMenu("videos")}>Videos</li>
                        <li className={profileMenu == "more" ? "active" : null} onClick={() => setProfileMenu("more")}>More<span><IoMdArrowDropdown /></span></li>
                    </ul>
                </div>
                <div className="col-lg-2">
                    <ul className='right_ccv'>
                        <li><span><BsThreeDots /></span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenuBar
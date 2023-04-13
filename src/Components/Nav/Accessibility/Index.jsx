import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RiSettings5Fill, RiQuestionnaireFill } from 'react-icons/ri'
import { MdArrowForwardIos, MdDarkMode, } from 'react-icons/md'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { IoLogOut } from 'react-icons/io5'
import { logOutAction } from '../../../Redux/Actions/SignInActions'

function Index({ setThemeOpen }) {
    const { user } = useSelector(x => x.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        navigate('/')
        dispatch(logOutAction())
        window.scrollTo(0, 0)
    }

    return (
        <div className='main_area animate__animated animate__fadeInLeft'>
            <div className="go_profile__" onClick={() => navigate(`/profile/${user && user.username}`)}>
                <div className="profile_picture">
                    <img src={user && user.picture} alt="picture" />
                </div>
                <div className="profile_info">
                    <h5>{user && user.first_name + " " + user.last_name}</h5>
                    <span>See your profile</span>
                </div>
            </div>
            <hr />

            {/* Bottom Side */}
            <div className="access_item_next d-flex align-items-center justify-content-between">
                <div className="name_icon__item">
                    <span><RiSettings5Fill /></span>
                    <span>Setting & Privacy</span>
                </div>
                <div className="arrow_access">
                    <MdArrowForwardIos />
                </div>
            </div>
            <div className="access_item_next d-flex align-items-center justify-content-between">
                <div className="name_icon__item">
                    <span><BsFillQuestionCircleFill /></span>
                    <span>Help & Support</span>
                </div>
                <div className="arrow_access">
                    <MdArrowForwardIos />
                </div>
            </div>
            <div onClick={() => setThemeOpen(true)} className="access_item_next d-flex align-items-center justify-content-between">
                <div className="name_icon__item">
                    <span><MdDarkMode /></span>
                    <span>Display & Accessibility</span>
                </div>
                <div className="arrow_access">
                    <MdArrowForwardIos />
                </div>
            </div>
            <div className="access_item_next d-flex align-items-center justify-content-between">
                <div className="name_icon__item">
                    <span><RiQuestionnaireFill /></span>
                    <span>Give Feedback</span>
                </div>
            </div>
            <div onClick={() => handleLogout()} className="access_item_next d-flex align-items-center justify-content-between">
                <div className="name_icon__item">
                    <span><IoLogOut /></span>
                    <span>Log Out</span>
                </div>
            </div>
            <div className="accessibility_about">
                Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  ·   · Meta © 2022
            </div>
        </div>
    )
}

export default Index
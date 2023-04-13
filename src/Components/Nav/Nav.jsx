import React, { useState } from 'react'
import './nav.css'
import { BsFacebook, BsGrid3X3GapFill, BsSearch } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'
import { FaBars, FaUserFriends, FaUsers } from 'react-icons/fa';
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { SiFacebookgaming } from 'react-icons/si'
import { TiArrowSortedDown } from 'react-icons/ti'
import { IoNotificationsSharp } from 'react-icons/io5'
import { BsMessenger } from 'react-icons/bs'
import { useMediaQuery } from 'react-responsive'
import Accessibility from './Accessibility/Accessibility'
import Notification from './Notification/Notification'
import AllMenu from './AllMenu/AllMenu'
import Search from './SearchModal/Search'
import { useSelector } from 'react-redux'
import Massage from './Massage/Massage'


function Nav({ setPostModal }) {

    const { user } = useSelector(x => x.auth)

    const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' })

    // End setting modal
    const [accessibilityModal, setAccessibilityModal] = useState(false)
    const [allMenuModal, setAllMenuModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [notificationModal, setNotificationModal] = useState(false)
    const [massageModal, setMessageModal] = useState(false)

    // Sub Modal Collapse
    const [themeOpen, setThemeOpen] = useState(false)

    const accessibilityCollapse = () => {
        setAllMenuModal(false)
        setNotificationModal(false)
        setMessageModal(false)
        setThemeOpen(false)
        setAccessibilityModal(!accessibilityModal)
    }
    const allMenuCollapse = () => {
        setAccessibilityModal(false)
        setNotificationModal(false)
        setMessageModal(false)
        setAllMenuModal(!allMenuModal)
    }
    const notificationCollapse = () => {
        setAllMenuModal(false)
        setAccessibilityModal(false)
        setMessageModal(false)
        setNotificationModal(!notificationModal)
    }
    const massageCollapse = () => {
        setAllMenuModal(false)
        setAccessibilityModal(false)
        setNotificationModal(false)
        setMessageModal(!massageModal)
    }


    return (
        <div className='main_nav_bars'>
            <div className="container-fluid h-100">
                <div className="row gx-1 h-100 align-items-center">
                    {/* Search Bar */}
                    <div className="col-md-3  h-100 d-flex align-items-center justify-content-between">
                        <div className="logo search_input message d-flex h-100 align-items-center">
                            <div className="main_logo">
                                <Link to="/">
                                    <span><BsFacebook /></span>
                                </Link>
                            </div>
                            <div onClick={() => setSearchModal(true)} className="search_bar_groupe">
                                <input type="search" className="form-control shadow-none" placeholder='Search Facebook' />
                                <span><BsSearch /></span>
                            </div>
                            <Search searchModal={searchModal} setSearchModal={setSearchModal} />
                        </div>
                        {
                            isMdScreen ? null :
                                <div className="search_bar_md_screen_icon">
                                    <BsMessenger />
                                </div>
                        }
                    </div>
                    {/* Main Nav Bars */}
                    <div className="col-md-6">
                        <div className="col-md-10 m-auto">
                            <div className="main_nav_groupe">
                                <ul >
                                    <li><NavLink to="/"><IoHome /></NavLink></li>
                                    <li><NavLink to="/friends"><FaUserFriends /></NavLink></li>
                                    <li><NavLink to="/video"><MdOutlineOndemandVideo /></NavLink></li>
                                    <li><NavLink to="/groupe"><FaUsers /></NavLink></li>
                                    {isMdScreen ? null : <li><NavLink to="/groupe"><IoNotificationsSharp /></NavLink></li>}
                                    {isMdScreen && <li><NavLink to="/gaming"><SiFacebookgaming /></NavLink></li>}
                                    {isMdScreen ? null :
                                        <li><NavLink to="/mobile_bars"><FaBars /></NavLink></li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        isMdScreen &&
                        <div className="col-md-3">
                            <div className="profile_item_action  h-100">
                                <div className="profile_link_ui">
                                    <NavLink to={`/profile/${user && user.username}`}>
                                        <img src={user && user.picture} alt="picture" />
                                        <h6>{user && user.first_name}</h6>
                                    </NavLink>
                                </div>
                                <ul>
                                    <li className={`profile_action_icon ${allMenuModal && "active_setting"}`} onClick={() => allMenuCollapse()}><BsGrid3X3GapFill /></li>
                                    <li className={`profile_action_icon ${massageModal && "active_setting"}`} onClick={() => massageCollapse()}><BsMessenger /></li>
                                    <li className={`profile_action_icon ${notificationModal && "active_setting"}`} onClick={() => notificationCollapse()}><IoNotificationsSharp /></li>
                                    <li className={`profile_action_icon ${accessibilityModal && "active_setting"}`} onClick={() => accessibilityCollapse()}><TiArrowSortedDown /></li>
                                </ul>
                            </div>
                            <Accessibility themeOpen={themeOpen} setThemeOpen={setThemeOpen} modal={accessibilityModal} setModal={accessibilityCollapse} />
                            <AllMenu setPostModal={setPostModal} allMenuModal={allMenuModal} setAllMenuModal={setAllMenuModal} />
                            <Notification notificationModal={notificationModal} setNotificationModal={setNotificationModal} />
                            <Massage modal={massageModal} setModal={setMessageModal} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Nav
import React, { useEffect } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { AiOutlineSound } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import Scrollbars from 'rc-scrollbars'
import './windgeds.css'
import { MdVideoCall, MdOutlineSearch } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { requested_friendAction } from '../../../Redux/Actions/UserAction'
import { useDispatch, useSelector } from 'react-redux'
function Widgets() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requested_friendAction())
    }, [])
    const { request } = useSelector(x => x.requestedFriend)

    return (
        <div className='widgets_home_right_ui'>
            <Scrollbars style={{ height: "88vh", width: "100%", marginTop: "20px" }} autoHide>
                <div className="col-lg-11 m-auto">
                    <div className="sponsor">
                        <h5>Sponsored</h5>
                        {/* Divider */}
                        <hr />
                    </div>
                    <div className="user_pages_ui_widgets">
                        {/* User */}
                        <h5>Your Pages</h5>
                        <div className="user_profile_item">
                            <div className="images_icon_user">
                                <img src="https://blog.photofeeler.com/wp-content/uploads/2017/09/tinder-photo-size-tinder-picture-size-tinder-aspect-ratio-image-dimensions-crop.jpg" alt="user" />
                            </div>
                            <h6>Kajol Roy</h6>
                        </div>
                        <div className="option_menu_tow_item">
                            <div className="d-flex align-items-center">
                                <span><IoNotificationsOutline /></span>
                                <span>6 Notification</span>
                            </div>
                        </div>
                        <div className="option_menu_tow_item">
                            <div className="d-flex align-items-center">
                                <span><AiOutlineSound /></span>
                                <span>Create promotion</span>
                            </div>
                        </div>
                        <hr />
                    </div>
                    {/* Friends Request */}
                    <div className="friend_request_widgets_ui">
                        <div className="title d-flex justify-content-between">
                            <h5>Friend Request</h5>
                            <Link to="/friends">See All</Link>
                        </div>
                        {
                            request.length ?
                                <div className="friends_widgets_item">
                                    <div className="user_xx_info">
                                        <div className="users_vx_info">
                                            <div className="images">
                                                <img src={request[0] && request[0].picture} alt="user" />
                                            </div>
                                            <div className="info">
                                                <h6>{request[0] && request[0].first_name + " " + request[0].last_name}</h6>
                                                <span>12 matual friends</span>
                                            </div>
                                        </div>
                                        <div className="request_time_ago ">
                                            6d
                                        </div>
                                    </div>
                                    <div className="action_users_xx_dg">
                                        <div onClick={() => navigate("/friends")} className="button btn me-2 py-1 px-3 btn-primary">Confirm</div>
                                        <div onClick={() => navigate("/friends")} className="button btn py-1 px-3 delete_btn">Delete</div>
                                    </div>
                                </div> :
                                <span className='don_t_have_req'>Don't have request !</span>

                        }

                    </div>
                    <hr />
                    {/* Contact Section */}
                    <div className="heading_contact_widgets_ui">
                        <div className="title_info_ac justify-content-between d-flex align-items-center">
                            <h5>Contact</h5>
                            <div className="right_side_ d-flex align-items-center">
                                <span><MdVideoCall /></span>
                                <span><MdOutlineSearch /></span>
                                <span><BsThreeDots /></span>
                            </div>
                        </div>

                        {/* All Active Friends */}
                        <div className="activated_widgets_group">
                            <div className="user_item_xx_db">
                                <div className="images_user">
                                    <span className="activated_green"></span>
                                    <img src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="user" />
                                </div>
                                <h6 className="name_user_widgets">
                                    Kajol Roy
                                </h6>
                            </div>
                            <div className="user_item_xx_db">
                                <div className="images_user">
                                    <span className="activated_green"></span>
                                    <img src="https://m.cricbuzz.com/a/img/v1/192x192/i1/c171058/wriddhiman-saha.jpg" alt="user" />
                                </div>
                                <h6 className="name_user_widgets">
                                    Josan Habi
                                </h6>
                            </div>
                            <div className="user_item_xx_db">
                                <div className="images_user">
                                    <span className="activated_green"></span>
                                    <img src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="user" />
                                </div>
                                <h6 className="name_user_widgets">
                                    Kamily Akhon
                                </h6>
                            </div>

                        </div>
                    </div>
                </div>
            </Scrollbars>
        </div>
    )
}

export default Widgets
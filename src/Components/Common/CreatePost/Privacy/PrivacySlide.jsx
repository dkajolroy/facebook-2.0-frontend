import Scrollbars from 'rc-scrollbars'
import React from 'react'
import { BiArrowBack, BiWorld } from 'react-icons/bi'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { FaLock, FaUserFriends } from 'react-icons/fa'

function Privacy({ setPrivacySlide, setPrivacy, privacy }) {
    const setPrivacyData = (data) => {
        setPrivacy(data)
        setPrivacySlide(false)
    }
    return (
        <div className='create_post_set_privacy '>
            <div className="animate__animated animate__fadeInRight">
                <div className="heading_privacy">
                    <h3>Select audience</h3>
                    <span onClick={() => setPrivacySlide(false)}> <BiArrowBack /></span>
                </div>
                <div className="divider"></div>
                <Scrollbars style={{ width: "100%", height: "380px" }}>
                    <div className="suggestion_for_you">
                        <span>Who can see your post?</span>
                        <p>Your post may show up in News Feed, on your profile, in search results, and in Messenger</p>
                    </div>
                    <div className="all_privacy_item_main">

                        <div className="privacy_item">
                            <label htmlFor="public">
                                <div className="left">
                                    <div className="icon_label">
                                        <span><BiWorld /></span>
                                    </div>
                                    <div className="desc_privacy">
                                        <span>Public</span>
                                        <p>Anyone on or off Facebook</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <span className={privacy == "public" ? "border_radio" : null}>
                                        <input onClick={() => setPrivacyData("public")} defaultChecked={privacy == "public" ? true : false} value="public" type="radio" id='public' name="privacy" />
                                    </span>
                                </div>
                            </label>
                        </div>

                        <div className="privacy_item">
                            <label htmlFor="friend">
                                <div className="left">
                                    <div className="icon_label">
                                        <span><FaUserFriends /></span>
                                    </div>
                                    <div className="desc_privacy">
                                        <span>Friends</span>
                                        <p>Your friends on facebook</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <span className={privacy == "friends" ? "border_radio" : null}>
                                        <input onClick={() => setPrivacyData("friends")} defaultChecked={privacy == "friends" ? true : false} value="friends" type="radio" id='friend' name="privacy" />
                                    </span>
                                </div>
                            </label>
                        </div>

                        <div className="privacy_item">
                            <label htmlFor="private">
                                <div className="left">
                                    <div className="icon_label">
                                        <span><BsFillShieldLockFill /></span>
                                    </div>
                                    <div className="desc_privacy">
                                        <span>Private</span>
                                        <p>Anyone on or off facebook</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <span className={privacy == "private" ? "border_radio" : null}>
                                        <input onClick={() => setPrivacyData("private")} defaultChecked={privacy == "private" ? true : false} value="private" type="radio" id='private' name="privacy" />
                                    </span>
                                </div>
                            </label>
                        </div>

                        <div className="privacy_item">
                            <label htmlFor="me">
                                <div className="left">
                                    <div className="icon_label">
                                        <span><FaLock /></span>
                                    </div>
                                    <div className="desc_privacy">
                                        <span>Only Me</span>
                                    </div>
                                </div>
                                <div className="right">
                                    <span className={privacy == "onlyme" ? "border_radio" : null}>
                                        <input onClick={() => setPrivacyData("onlyme")} defaultChecked={privacy == "onlyme" ? true : false} value="onlyme" type="radio" id='me' name="privacy" />
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>
                </Scrollbars>
            </div></div>
    )
}

export default Privacy
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

function More({ setFellingSlide, setBackground, setMore, setTagSlide, setImageVideoOption }) {
    const handleImageVideo = () => {
        setMore(false)
        setImageVideoOption(true)
        setBackground('')
    }
    const handleTag = () => {
        setMore(false)
        setTagSlide(true)
    }
    const handleFelling = () => {
        setMore(false)
        setFellingSlide(true)
    }

    return (
        <div className="create_post_more">
            <div className=' animate__animated animate__fadeInBottomRight'>
                <div className="heading_privacy">
                    <h3>Add to your post</h3>
                    <span onClick={() => setMore(false)}> <BiArrowBack /></span>
                </div>
                <div className="divider"></div>

                <div className="all_item_menu">
                    <div className="row gx-0">
                        <div onClick={handleImageVideo} className="col-6 item_more_">
                            <div className="icon_menu_icon _photos">
                                <i></i>
                            </div>
                            <div className="title_menu">
                                <span>Photo/Video</span>
                            </div>
                        </div>
                        <div onClick={handleTag} className="col-6 item_more_">
                            <div className="icon_menu_icon tag">
                                <i></i>
                            </div>
                            <div className="title_menu">
                                <span>Tag People</span>
                            </div>
                        </div>
                        <div onClick={handleFelling} className="col-6 item_more_">
                            <div className="icon_menu_icon felling">
                                <i></i>
                            </div>
                            <div className="title_menu">
                                <span>Feeling/activity</span>
                            </div>
                        </div>
                        <div className="col-6 item_more_">
                            <div className="icon_menu_icon check">
                                <i></i>
                            </div>
                            <div className="title_menu">
                                <span>Check in</span>
                            </div>
                        </div>
                        <div className="col-6 item_more_">
                            <div className="icon_menu_icon host">
                                <i></i>
                            </div>
                            <div className="title_menu">
                                <span>Host a Q&A</span>
                            </div>
                        </div>
                        <div className="col-6 item_more_">
                            <div className="icon_menu_icon life">
                                <i></i>
                            </div>
                            <div className="title_menu">
                                <span>Life event</span>
                            </div>
                        </div>
                        <div className="col-6 item_more_">
                            <div className="icon_menu_icon gif">
                                <i></i>
                            </div>
                            <div className="title_menu">
                                <span>GIF</span>
                            </div>
                        </div>
                        <div className="col-6 item_more_">
                            <div className="icon_menu_icon live">
                                <i></i>
                            </div>
                            <div className="title_menu">
                                <span>Live video</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default More
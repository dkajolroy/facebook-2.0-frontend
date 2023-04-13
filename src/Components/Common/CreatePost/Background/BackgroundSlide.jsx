import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import './background.css'
import backgroundData from '../../../../Helpers/postBackground';
import Scrollbars from 'rc-scrollbars'

function BackgroundSlide({ setBackgroundModal, setBackground }) {

    const setDataBackground = (data) => {
        setBackground(data)
        setBackgroundModal(false)
    }

    return (
        <div className='background_slide_new_back'>
            <div className="animate__animated animate__fadeInBottomRight">
                <div className="heading_privacy">
                    <h3>Choose Background</h3>
                    <span onClick={() => setBackgroundModal(false)}> <BiArrowBack /></span>
                </div>
                <div className="divider"></div>
                <Scrollbars autoHide style={{ width: "100%", height: "390px" }}>
                    <div className="body_of_background_data">
                        <div className="avatar_all_background">
                            <h4>Avatar</h4>
                        </div>
                        <div className="all_items_of_back">
                            {
                                backgroundData && backgroundData.slice(30, 35).map((x, i) =>
                                    <div
                                        onClick={() => setDataBackground({ image: x.background, color: x.color })}
                                        key={i}
                                        className="item_of_background_ll">
                                        <div className="images_of_back_rr">
                                            <img src={x.background} alt="background" />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="body_of_background_data">
                        <div className="avatar_all_background">
                            <h4>Vector </h4>
                        </div>
                        <div className="all_items_of_back">
                            {
                                backgroundData && backgroundData.slice(1, 10).map((x, i) =>
                                    <div
                                        onClick={() => setDataBackground({ image: x.background, color: x.color })}
                                        key={i}
                                        className="item_of_background_ll">
                                        <div className="images_of_back_rr">
                                            <img src={x.background} alt="background" />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="body_of_background_data">
                        <div className="avatar_all_background">
                            <h4>Color</h4>
                        </div>
                        <div className="all_items_of_back">
                            {
                                backgroundData && backgroundData.slice(11, 30).map((x, i) =>
                                    <div
                                        onClick={() => setDataBackground({ image: x.background, color: x.color })}
                                        key={i}
                                        className="item_of_background_ll">
                                        <div className="images_of_back_rr">
                                            <img src={x.background} alt="background" />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </Scrollbars>

            </div>
        </div>
    )
}

export default BackgroundSlide
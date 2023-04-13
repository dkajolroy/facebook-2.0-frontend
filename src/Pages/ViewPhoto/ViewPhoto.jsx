import React from "react";
import './view.css'
import "swiper/css";
import "swiper/css/navigation";
import { CgClose } from 'react-icons/cg'
import { BsFacebook } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";

function ViewPhoto() {
    const navigate = useNavigate()
    const { images } = useSelector(x => x.viewPhotos)
    const { user } = useSelector(x => x.auth)

    useEffect(() => {
        if (images.length < 1) {
            navigate(-1)
        }
    }, [images])

    return (
        <div className='view_photo_post_and_profile '>
            <div className="tob_bar_area_to_position">
                <div className="row_label_fb">
                    <span><BsFacebook /></span>
                    <div className="user_account">
                        <div className="image_of_user">
                            <img src={user && user.picture} alt="user" />
                        </div>
                        <div className="name_of_user_ss">
                            <h4>{user && user.first_name + " " + user.last_name}</h4>
                        </div>
                    </div>
                </div>
                <div className="row_label">
                    <span onClick={() => navigate(-1)}><CgClose /></span>
                </div>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    images.map((x, i) => (
                        <SwiperSlide style={{ background: "none" }} key={i}>
                            <div className="image_items_all animate__animated animate__fadeIn">
                                <img src={x} alt="image" />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default ViewPhoto
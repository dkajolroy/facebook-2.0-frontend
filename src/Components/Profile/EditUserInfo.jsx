import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { MdWork } from 'react-icons/md';
import Scrollbars from 'rc-scrollbars';
import { ImHome3 } from 'react-icons/im';
import { IoLocationSharp } from 'react-icons/io5';
import { RiAlarmFill, RiWifiFill } from 'react-icons/ri'
import { BsGithub } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import SocialItem from './AboutSide/SocialItem';

function EditUserInfo({ setEditInfoModal, setPictureModal, editInfoModal }) {
    const { value } = useSelector(x => x.theme)
    const { profile } = useSelector(x => x.user)

    const setUpProfilePicture = () => {
        setPictureModal(true)
        setEditInfoModal(false)
    }
    const setUpCoverPicture = () => {
        setEditInfoModal(false)
    }



    const [signUpTime, setSignUpTime] = useState()
    useEffect(() => {
        setSignUpTime(profile && profile.createdAt)
    }, [profile])


    return (
        <Modal
            isOpen={editInfoModal}
            contentLabel="Edit Picture"
            ariaHideApp={false}
            className={`profile_edit_details_modal animate__animated animate__fadeIn ${value}`}
            onRequestClose={() => setEditInfoModal(false)}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    top: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: `${value == "dark" ? "rgb(10 10 10 / 68%)" : "var(--bg-transparent1)"}`,
                    zIndex: 50003
                },
                content: {
                    top: '0',
                    left: "0",
                    border: "none",
                    zIndex: "1000",
                    padding: '0 10px'
                }
            }}
        >
            <div className="all_items_of_profile_data_edit">
                <div className="heading_top_x_bars">
                    <h5>Edit Profile</h5>
                    <span onClick={() => setEditInfoModal(false)}><CgClose /></span>
                </div>
                <div className="divider"></div>
                <Scrollbars style={{ width: "100%", height: "440px" }}>
                    <div className="total_scroll_of_edit_profile">
                        {/* Profile Picture Edit  */}
                        <div className="profile_picture_">
                            <div className="heading_of_edit_profile_ed">
                                <h6>Profile Picture</h6>
                                <button onClick={() => setUpProfilePicture()} className="btn shadow-none text-primary">Edit</button>
                            </div>
                            <div className="profile_picture_edit_i">
                                <img src={profile && profile.picture} alt="user" />
                            </div>
                        </div>
                        {/* Cover Image Edit  */}
                        <div className="profile_picture_">
                            <div className="heading_of_edit_profile_ed">
                                <h6>Cover Photo</h6>
                                <button onClick={() => setUpCoverPicture()} className="btn shadow-none text-primary">Edit</button>
                            </div>
                            <div className="profile_cover_edit_i">
                                <img src={profile && profile.cover} alt="user" />
                            </div>
                        </div>
                        {/* Bio Edit Option */}
                        <div className="profile_picture_">
                            <div className="heading_of_edit_profile_ed">
                                <h6>Bio</h6>
                                <button onClick={() => setUpCoverPicture()} className="btn shadow-none text-primary">Edit</button>
                            </div>
                            <div className="profile_bio_edit_i">
                                <span>{profile.details && profile.details.bio}</span>
                            </div>
                        </div>
                        {/* Info Customize Option */}
                        <div className="profile_picture_">
                            <div className="heading_of_edit_profile_ed">
                                <h6>Customize your info</h6>
                                <button onClick={() => setUpCoverPicture()} className="btn shadow-none text-primary">Edit</button>
                            </div>
                            <div className="profile_all_info_edit_i">

                                {/* Work Item */}
                                {
                                    profile.work && profile.work.map((x, i) => (
                                        <div className="work_items_dd" key={i}>
                                            <div className="icon_of_work_pp">
                                                <i><MdWork /></i>
                                            </div>
                                            <div className="work_title_pp">
                                                <p>{`${x.desc} ${x.position} at`}</p>
                                                <span> {x.company}</span>
                                            </div>
                                        </div>
                                    ))
                                }

                                {/* Live In  */}
                                <div className="work_items_dd">
                                    <div className="icon_of_work_pp">
                                        <i><ImHome3 /></i>
                                    </div>
                                    <div className="work_title_pp">
                                        <p>Live In </p>
                                        <span> {profile.details && profile.details.currentCity.name}.</span>
                                    </div>
                                </div>

                                {/* From  */}
                                <div className="work_items_dd">
                                    <div className="icon_of_work_pp">
                                        <i><IoLocationSharp /></i>
                                    </div>
                                    <div className="work_title_pp">
                                        <p>From</p>
                                        <span>{profile.details && profile.details.homeTown.name}. </span>
                                    </div>
                                </div>
                                {/* Status */}
                                <div className="work_items_dd">
                                    <div className="icon_of_work_pp">
                                        <i><FaHeart /></i>
                                    </div>
                                    <div className="work_title_pp">
                                        <p> {profile.details && profile.details.relationship}</p>
                                    </div>
                                </div>
                                {/* Join on  */}
                                <div className="work_items_dd">
                                    <div className="icon_of_work_pp">
                                        <i><RiAlarmFill /></i>
                                    </div>
                                    <div className="work_title_pp">
                                        <p> {"Joined" + " " + new Date(signUpTime && signUpTime).toDateString().split(" ")[1] + " " + new Date(signUpTime && signUpTime).getFullYear()}</p>
                                    </div>
                                </div>
                                {/* Followed by total  */}
                                <div className="work_items_dd">
                                    <div className="icon_of_work_pp">
                                        <i><RiWifiFill /></i>
                                    </div>
                                    <div className="work_title_pp">
                                        <p>Followed by {`${profile.followers && profile.followers.length} people`}</p>
                                    </div>
                                </div>

                                {/* Social Link status*/}
                                <div className="user_from_district ">
                                    <SocialItem />
                                </div>
                            </div>
                            {/* Hobbies all */}
                            <div className="profile_picture_">
                                <div className="heading_of_edit_profile_ed">
                                    <h6>Hobbies</h6>
                                    <button onClick={() => setUpCoverPicture()} className="btn shadow-none text-primary">Edit</button>
                                </div>
                                <div className="all_hobbies_items">
                                    <div className="all_items_of_hobbies_fal_con">
                                        {
                                            profile.hobbies && profile.hobbies.map((x, i) => (
                                                <div key={i} className="hobbies_all_s">
                                                    <span>
                                                        <i><i className={x.icon}></i></i>
                                                        {x.title}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </Modal>
    )
}

export default EditUserInfo
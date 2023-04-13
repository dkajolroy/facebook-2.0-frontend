import Scrollbars from 'rc-scrollbars';
import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import CurrentCityItem from './AllItems/CurrentCityItem';
import EducationItem from './AllItems/EducationItem';
import WorkItem from './AllItems/WorkItem';
import HomeTownItem from './AllItems/HomeTownItem';
import { BsPlusLg } from 'react-icons/bs';
import RelationshipItem from './AllItems/RelationshipItem';
import Website from './AllItems/Website';
import SocialItem from './SocialItem';
import TextLoading from '../../Common/Loading/TextLoading';

function DetailsModal({ setEditInfoModal, editDetailModal, setEditDetailModal }) {

    const { value } = useSelector(x => x.theme)
    const { profile, loading } = useSelector(x => x.user)

    const navigateTOEdit = () => {
        setEditInfoModal(true)
        setEditDetailModal(false)
    }


    const [signUpTime, setSignUpTime] = useState()
    useEffect(() => {
        setSignUpTime(profile && profile.createdAt)
    }, [profile])


    return (
        <Modal
            isOpen={editDetailModal}
            contentLabel="Edit Picture"
            ariaHideApp={false}
            className={`profile_edit_details_modal animate__animated animate__fadeIn ${value}`}
            onRequestClose={() => setEditDetailModal(false)}
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

            <div className="all_photos_items_cover">
                <div className="heading_top_x_bars">
                    <h5>Edit details</h5>
                    <span onClick={() => setEditDetailModal(false)}><CgClose /></span>
                </div>
                <hr />
                <div className="scroll_all_data">
                    <Scrollbars style={{ width: "100%", height: "350px" }}>
                        <div className="total_section_all_item">
                            <div className="desc_edit_details_modal_about">
                                <h6>Customize your intro</h6>
                                <span>Details you select will be public.</span>
                            </div>
                            {/* All Work Items */}
                            <div className="work_all_sec">
                                <h4>Work</h4>
                                <div className="all_work_item_fg">
                                    {

                                        loading ?
                                            <div className='row w-100 m-auto' >
                                                <TextLoading w="100%" />
                                                <TextLoading w="100%" />
                                                <TextLoading w="100%" />
                                            </div> :
                                            profile.work && profile.work.map((x, i) => (
                                                <WorkItem key={i} item={x} navigateTOEdit={navigateTOEdit} />
                                            ))}
                                </div>
                                <div className="add_work_add_item">
                                    <span><BsPlusLg /></span>
                                    <span>Add a workplace</span>
                                </div>
                            </div>
                            {/* All Education Items */}
                            <div className="work_all_sec">
                                <h4>Education</h4>
                                <div className="all_work_item_fg">
                                    <EducationItem navigateTOEdit={navigateTOEdit} />
                                    <EducationItem navigateTOEdit={navigateTOEdit} />
                                </div>
                                <div className="add_work_add_item">
                                    <span><BsPlusLg /></span>
                                    <span>Add a High school</span>
                                </div>
                                <div className="add_work_add_item">
                                    <span><BsPlusLg /></span>
                                    <span>Add a Collage</span>
                                </div>
                            </div>
                            {/* Current City Items */}
                            <div className="work_all_sec">
                                <h4>Current City</h4>
                                <div className="all_work_item_fg">
                                    <CurrentCityItem navigateTOEdit={navigateTOEdit} />
                                </div>
                            </div>
                            {/* Home Town Items */}
                            <div className="work_all_sec">
                                <h4>Home Town</h4>
                                <div className="all_work_item_fg">
                                    <HomeTownItem navigateTOEdit={navigateTOEdit} />
                                </div>
                            </div>
                            {/* Relationship Items */}
                            <div className="work_all_sec">
                                <h4>Relationship</h4>
                                <div className="all_work_item_fg">
                                    <RelationshipItem navigateTOEdit={navigateTOEdit} />
                                </div>
                            </div>
                            {/* Relationship Items */}
                            <div className="work_all_sec">
                                <h4>Joined Facebook</h4>
                                <div className="all_work_item_fg">
                                    <div className="work_item">
                                        <div className="left">
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={true} />
                                                <span className="slider round"></span>
                                            </label>
                                            <span className='span'>{"Joined" + " " + new Date(signUpTime && signUpTime).toDateString().split(" ")[1] + " " + new Date(signUpTime && signUpTime).getFullYear()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Followers Items */}
                            <div className="work_all_sec">
                                <h4>Followers</h4>
                                <div className="all_work_item_fg">
                                    <div className="work_item">
                                        <div className="left">
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={true} />
                                                <span className="slider round"></span>
                                            </label>
                                            <span className='span'>Followed by {`${profile.followers && profile.followers.length} people`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Websites Items */}
                            <div className="work_all_sec">
                                <div className="heading_cdcd">
                                    <div className="left_cd">
                                        <h4 className='cdl'>Websites</h4>
                                        <span className='sdd'>To feature links on your profile, set the audience to Public.</span>
                                    </div>
                                    <div className="ff">
                                        <button className="btn px-4 py-1 shadow-none">Public</button>
                                    </div>
                                </div>

                                <div className="all_work_item_fg">
                                    <Website navigateTOEdit={navigateTOEdit} />
                                </div>
                            </div>
                            {/* Social Icons Items */}
                            <div className="work_all_sec">
                                <div className="heading_cdcd">
                                    <div className="left_cd">
                                        <h4 className='cdl'>Social Links</h4>
                                        <span className='sdd'>To feature links on your profile, set the audience to Public.</span>
                                    </div>
                                    <div className="ff">
                                        <button className="btn px-4 py-1 shadow-none">Public</button>
                                    </div>
                                </div>
                                {/* Social Link status*/}
                                <div className="user_from_district ">
                                    <SocialItem />
                                </div>
                            </div>
                        </div>
                    </Scrollbars>
                </div>

                <div className="divider"></div>
                <div className="bottom_menu_action_update_xx">
                    <div className="update_button_rf">
                        <button className="btn text-primary shadow-none">Update Your Information</button>
                    </div>
                    <div className="update_button_rf">
                        <button onClick={() => setEditDetailModal(false)} className="btn px-3 py-1 me-2 btn-secondary shadow-none">Cancel</button>
                        <button onClick={() => setEditDetailModal(false)} className="btn px-5 py-1 shadow-none btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DetailsModal
import React, { useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { BsSearch } from 'react-icons/bs';
import Scrollbars from 'rc-scrollbars';
import hobbies from '../../../Helpers/hobbies';
import { useState } from 'react';
import { BiWorld } from 'react-icons/bi';
import { hobbiesAction } from '../../../Redux/Actions/UserAction';

function HobbiesModal({ setHobbiesModal, hobbiesModal }) {

    const { value } = useSelector(x => x.theme)
    const { profile } = useSelector(x => x.user)



    // Filtering Hobbies
    const [char, setChar] = useState('')
    const [hobbiesItem, setHobbiesItem] = useState(hobbies)
    const [addToFeb, setAddToFeb] = useState()
    useEffect(() => {
        setAddToFeb(profile && profile.hobbies)
    }, [profile])

    const searchContent = (e) => {
        setChar(e)
        const filterAll = hobbies.filter(x => x.title.toLocaleLowerCase().includes(e.toLocaleLowerCase()))
        if (filterAll) {
            setHobbiesItem(filterAll)
        } else {
            setHobbiesItem(hobbies)
        }
    }
    // Add 
    const addTo = (e) => {
        const newAdd = [...addToFeb, e]
        const filterAlready = addToFeb.filter(x => x.title == e.title)
        if (filterAlready.length < 1) {
            setAddToFeb(newAdd)
        }
    }
    // Remove to
    const removeTo = (e) => {
        const filterItem = addToFeb.filter(x => x.title !== e.title)
        setAddToFeb(filterItem)
    }
    const closeModal = () => {
        setChar('')
        setHobbiesModal(false)
        setHobbiesItem(hobbies)
    }

    // Save hobbies
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const saveHobbies = async () => {
        setLoading(true)
        const data = { hobbies: addToFeb }
        await dispatch(hobbiesAction(data))
        setLoading(false)
        setHobbiesModal(false)
    }
    return (
        <Modal
            isOpen={hobbiesModal}
            contentLabel="Edit Picture"
            ariaHideApp={false}
            className={`profile_edit_details_modal animate__animated animate__fadeIn ${value}`}
            onRequestClose={() => closeModal()}
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
                    height: "550px",
                    padding: '0 10px'
                }
            }}
        >

            <div className="all_photos_items_cover">
                <div className="heading_top_x_bars">
                    <h5>Edit Hobbies</h5>
                    <span onClick={() => closeModal()}><CgClose /></span>
                </div>
                <hr />
                <div className="body_of_hobbies_all_ff">
                    <div className="d-flex align-items-center search_cndcndkcd">
                        <div className="search_bar_groupe w-100">
                            <input onChange={(e) => searchContent(e.target.value)} type="search" className="form-control shadow-none" placeholder='Search Facebook' />
                            <span className='animate__animated animate__fadeInRight'><BsSearch /></span>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="selected_hobbies_box_lk">
                        <h6>SELECTED HOBBIES</h6>
                        <div className="all_hobbies_edit_all">
                            <Scrollbars autoHide style={{ width: "100%", height: "100px" }}>
                                <div className="all_items_of_add_fea">
                                    {
                                        addToFeb && addToFeb.map((x, i) => (
                                            <div key={i} className="hobbies_item_gg animate__animated animate__fadeInRight">
                                                <span><i className={x.icon}></i></span>
                                                <h6>{x.title}</h6>
                                                <i onClick={() => removeTo(x)}><CgClose /></i>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Scrollbars>
                        </div>

                        {/* WithOut Other */}
                        <div className="all_items_of_without">
                            <div className="heading_of_all_hobbies_le">
                                Results for <span>"{char}"</span>
                            </div>
                            <Scrollbars autoHide style={{ width: "100%", height: "190px" }}>
                                <div className="all_items_of_hobbies_fal_con">
                                    {
                                        hobbiesItem.map((x, i) => (
                                            <div onClick={() => addTo(x)} key={i} className="hobbies_all_s">
                                                <span>
                                                    <i><i className={x.icon}></i></i>
                                                    {x.title}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
                <div className="bottom_to_action_this_feature">
                    <div className="divider"></div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="left_waring_of_feature">
                            <i><BiWorld /></i>
                            <span>Hobbies are public</span>
                        </div>
                        <div className="right_to_action_feature">
                            <button onClick={() => closeModal()} className="btn py-1  shadow-none">Cancel</button>
                            <button onClick={() => saveHobbies()} className="btn py-1 px-4  shadow-none btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default HobbiesModal
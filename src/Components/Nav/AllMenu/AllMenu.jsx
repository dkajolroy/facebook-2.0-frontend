import React from 'react'
import { BsSearch } from 'react-icons/bs'
import Modal from 'react-modal'
import './all_menu.css'
import { menu, create } from '../../../Helpers/allMenu';
import '../../../Helpers/icon/icon.css'
import Items from './Items';
import { Scrollbars } from 'rc-scrollbars'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AllMenus({ allMenuModal, setPostModal, setAllMenuModal }) {
    const { value } = useSelector(x => x.theme)
    const [menuData, setMenuData] = useState(menu)
    const navigate = useNavigate()

    const filterMenu = (data) => {
        const filter = menu.filter(x => x.name.toLocaleLowerCase().includes(data.toLocaleLowerCase()))
        setMenuData(filter);
    }

    const goToCreateStory = (value) => {
        if (value.toLocaleLowerCase() == "story") {
            navigate('/story')
            window.scrollTo(0, 0)
        } else if (value.toLocaleLowerCase() == "post") {
            setPostModal(true)
            setAllMenuModal(false)
        }
    }
    return (
        <Modal
            isOpen={allMenuModal}
            contentLabel="ALL Menu"
            ariaHideApp={false}
            className={`all_menu_modal_customize ${value}`}
            onRequestClose={() => setAllMenuModal(false)}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    top: "53px",
                    display: "flex",
                    justifyContent: "end",
                    background: "transparent",
                    zIndex: 5001
                },
                content: {
                    top: '0',
                    left: "0",
                    border: "none",
                    zIndex: "1000",
                    padding: '0'
                }
            }}
        >
            <div className="profile__setting_ui all_menu_ui_ff">
                <div className="heading_all_menu"><h3>Menu</h3></div>
                <Scrollbars autoHide style={{ height: "80vh", width: "100%" }}>
                    <div className="row gx-0 pe-3">
                        <div className="col-8 gx-4">
                            <div className="all_menus">
                                <div className="search_bar_groupe">
                                    <input onChange={(e) => filterMenu(e.target.value)} type="search" className="form-control shadow-none" placeholder='Search Facebook' />
                                    <span><BsSearch /></span>
                                </div>
                                <div className="social_menus">
                                    <h5>Social</h5>
                                    {
                                        menuData.slice(1, 6).map((x, i) => (
                                            <Items items={x} key={i} />
                                        ))
                                    }
                                    <hr />
                                    <h5>Entertainment</h5>
                                    {
                                        menuData.slice(6, 9).map((x, i) => (
                                            <Items items={x} key={i} />
                                        ))
                                    }
                                    <hr />
                                    <h5>Shopping</h5>
                                    {
                                        menuData.slice(9, 11).map((x, i) => (
                                            <Items items={x} key={i} />
                                        ))
                                    }
                                    <hr />
                                    <h5>Personal</h5>
                                    {
                                        menuData.slice(11, 15).map((x, i) => (
                                            <Items items={x} key={i} />
                                        ))
                                    }
                                    <hr />
                                    <h5>Professional</h5>
                                    {
                                        menuData.slice(15, 16).map((x, i) => (
                                            <Items items={x} key={i} />
                                        ))
                                    }
                                    <hr />
                                    <h5>Community Resources</h5>
                                    {
                                        menuData.slice(16, 21).map((x, i) => (
                                            <Items items={x} key={i} />
                                        ))
                                    }
                                    <hr />
                                    <h5>More from Meta</h5>
                                    {
                                        menuData.slice(21, 25).map((x, i) => (
                                            <Items items={x} key={i} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-4  back_ground_all_side_nav">
                            <div className="heading"><h3>Create</h3></div>
                            <div className="side_menu_all">
                                {
                                    create.slice(0, 3).map((x, i) => (
                                        <div onClick={() => goToCreateStory(x.name)} key={i} className="create_side_items">
                                            <div className={`icon_back ${value == "dark" && "icon_into"}`}>
                                                <i className={x.icon}></i>
                                            </div>
                                            <span>{x.name}</span>
                                        </div>
                                    ))
                                }
                                <hr />
                                {
                                    create.slice(3, 10).map((x, i) => (
                                        <div key={i} className="create_side_items">
                                            <div className={`icon_back ${value == "dark" && "icon_into"}`}>
                                                <i className={x.icon}></i>
                                            </div>
                                            <span>{x.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </Modal>
    )
}

export default AllMenus
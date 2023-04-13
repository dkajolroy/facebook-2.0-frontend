import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoIosArrowForward, IoMdArrowRoundBack } from 'react-icons/io';
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import './search.css'
// import { useMediaQuery } from 'react-responsive';
import { addSearchedUserAction, getAllUserAction, getDetailsAction, removeSearchedUserAction } from '../../../Redux/Actions/UserAction';
import { CgClose } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom'

function Search({ setSearchModal, searchModal }) {
    // Responsive Media Query
    // const isMdScreen = useMediaQuery({ query: '(max-width: 568px)' })
    //get profile data
    const { username } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailsAction())
        dispatch(getAllUserAction())
    }, [dispatch])
    const { value } = useSelector(x => x.theme)
    const { profile } = useSelector(x => x.user)
    const { user } = useSelector(x => x.allUser)
    const [searchUser, setSearchUser] = useState([])

    const searchContent = (info) => {
        if (!info.trim() == "") {
            const filterUser = user.filter(x => x.first_name.toLowerCase().includes(info.toLowerCase()))
            setSearchUser(filterUser)
        } else {
            setSearchUser([])
        }
    }

    // Delete Searched User
    const deleteSearched = (userID) => {
        dispatch(removeSearchedUserAction({ user: userID }))
    }
    const addSearched = (userID, username) => {
        dispatch(addSearchedUserAction({ user: userID }))
        navigate(`/profile/${username}`)
        setSearchModal(false)
    }

    const closeModal = () => {
        setSearchModal(false)
        setSearchUser([])
    }
    return (
        <Modal
            isOpen={searchModal}
            contentLabel="SignUp Modal"
            ariaHideApp={false}
            className={`search_modal_nav ${value}`}
            onRequestClose={() => closeModal()}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    top: "0",
                    zIndex: "50000",
                    display: "flex",
                    justifyContent: "start",
                    background: "transparent",
                },
                content: {
                    top: '0',
                    left: "0",
                    border: "none",
                    margin: 0,
                    zIndex: "1000",
                    padding: '0'
                }
            }}
        >
            <div className="search__bar_nav_ui">
                <div className="d-flex align-items-center search_cndcndkcd">
                    <span onClick={() => closeModal()} className='search_back animate__animated animate__fadeInRight'><IoMdArrowRoundBack /></span>
                    <div className="search_bar_groupe">
                        <input onChange={(e) => searchContent(e.target.value)} type="search" className="form-control shadow-none" placeholder='Search Facebook' />
                        <span className='animate__animated animate__fadeInRight'><BsSearch /></span>
                    </div>
                </div>
                <div className="header__search_title_edit d-flex justify-content-between px-3">
                    <span>Recent Searches</span>
                    <span>Edit</span>
                </div>
                <div className="all_search_user">
                    {searchUser.length > 0 ?
                        searchUser.slice(0, 5).map((x, i) => (
                            <div key={i} className="item_of_search_item" onClick={() => addSearched(x._id, x.username)}>
                                <div className="left_side">
                                    <div className="item_picture">
                                        <img src={x.picture} alt="user" />
                                    </div>
                                    <div className="item_name">
                                        <h6>{x.first_name + " " + x.last_name}</h6>
                                    </div>
                                </div>
                                <div className="right_side">
                                    <span><IoIosArrowForward /></span>
                                </div>
                            </div>
                        )) :
                        profile.search && profile.search.slice(0, 5).map((x, i) => (
                            <div onClick={() => navigate(`/profile/${x.username}`)} key={i} className="item_of_search_item">
                                <div className="left_side">
                                    <div className="item_picture">
                                        <img src={x.picture} alt="user" />
                                    </div>
                                    <div className="item_name">
                                        <h6>{x.first_name + " " + x.last_name}</h6>
                                    </div>
                                </div>
                                <div className="right_side">
                                    <span onClick={() => deleteSearched(x._id)}><CgClose /></span>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </Modal>
    )
}

export default Search
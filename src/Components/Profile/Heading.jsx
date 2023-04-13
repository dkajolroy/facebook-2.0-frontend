import React, { useEffect } from 'react'
import { BsFillCameraFill, BsMessenger, BsPencilFill } from 'react-icons/bs'
import { FaCamera, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { allFriendsAction, getDetailsAction, removeCoverAction } from '../../Redux/Actions/UserAction'
import { useState } from 'react';
import CoverImage from './Cover/CoverImage';
import { useRef } from 'react';
import LoadingModal from './ProfilePicture/LoadingModal';
import CoverErrorModal from './Cover/CoverErrorModal';
import CoverLoading from '../Common/Loading/CoverLoading';
import { getMyPostAction } from '../../Redux/Actions/PostActions';
import SelectCoverModal from './Cover/SelectCoverModal';
import PictureLoading from '../Common/Loading/PictureLoading';
import ProfileNameLoadingJsx from '../Common/Loading/ProfileNameLoading';
import EditUserInfo from './EditUserInfo';
import { useNavigate, useParams } from 'react-router-dom';

function Heading({ setPictureModal, setEditInfoModal, editInfoModal }) {

    // Call Api
    const { username } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailsAction(username))
        dispatch(getMyPostAction(username))
        dispatch(allFriendsAction(username))
    }, [dispatch, username, getMyPostAction, getDetailsAction])
    // Get Data
    const { profile, loading } = useSelector(x => x.user)
    const { user } = useSelector(x => x.auth)
    const { value } = useSelector(x => x.theme)
    const [coverOption, setCoverOption] = useState(false)

    // Upload Cover Image
    const ref = useRef(null)
    const [coverSelectModal, setCoverSelectModal] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [error, setError] = useState(null)
    const [cover, setCover] = useState(null)
    const selectImage = (e) => {
        let files = e[0]
        if (
            files.type !== "image/jpg" &&
            files.type !== "image/png" &&
            files.type !== "image/jpeg"
        ) {
            setError(files.name.split(".").pop() + " Format Not Supported !!")
            setErrorModal(true)
            setCoverOption(false)
            return
        } else if (
            files.size > 1000 * 1000 * 5
        ) {
            setError("File size too large !!")
            setCoverOption(false)
            setErrorModal(true)
            return
        }
        else {
            setCoverOption(false)
            let reader = new FileReader()
            reader.readAsDataURL(files)
            reader.onload = (e) => {
                setCover(e.target.result)
            }
        }
    }

    // Cover Reposition
    const repositionCover = async () => {
        let blob = await fetch(profile.cover).then(b => b.blob())
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = (e) => {
            setCover(e.target.result)
            setCoverOption(false)
        }
    }

    // Remove Cover Image
    const removeCover = async () => {
        setLoadingModal(true)
        await dispatch(removeCoverAction())
        setCoverOption(false)
        setLoadingModal(false)
    }
    // Select Cover Modal Open
    const selectCover = () => {
        setCoverSelectModal(true)
        setCoverOption(false)
    }

    const findFriends = profile.friends && profile.friends.filter(x => x._id == user._id)


    return (
        <div className="container-fluid gx-0">
            <div className="top_hading_profile_user_info" onMouseLeave={() => setCoverOption(false)}>
                <div className="col-lg-10 col-xl-9 col-md-11 m-auto">
                    <div className="cover_profile">
                        <div className="cover_photo_stamp h-100" >
                            {
                                loading ?
                                    <CoverLoading /> :
                                    <CoverImage
                                        setLoadingModal={setLoadingModal}
                                        setCover={setCover} inputRef={ref}
                                        cover={cover} profile={profile}
                                    />
                            }
                            <input onChange={(e) => selectImage(e.target.files)} ref={ref} type="file" hidden accept='image/jpg, image/png, image/jpeg' />
                            {errorModal &&
                                <CoverErrorModal inputRef={ref} errorModal={errorModal} setErrorModal={setErrorModal} error={error} setError={setError} />
                            }
                            {coverSelectModal &&
                                <SelectCoverModal setCover={setCover} coverSelectModal={coverSelectModal} setCoverSelectModal={setCoverSelectModal} />
                            }
                            {
                                loadingModal && //Upload Cover Loading
                                <LoadingModal />
                            }
                        </div>
                        {
                            user.username == username ?
                                <div className="edit_view_action_gr">
                                    <div className="action_vfk">
                                        <button onClick={() => setCoverOption(!coverOption)} className="btn shadow-none cover_image_upload">
                                            <span><FaCamera /></span>
                                            <span>Edit Cover Photo</span>
                                        </button>
                                        {
                                            coverOption &&
                                            <div className={`show_option_change_cover ${value == "light" ? "light_theme_cover" : "dark_theme_cover"}`}>
                                                <button onClick={() => selectCover()} className="btn shadow-none"><i></i>Select Photo</button>
                                                <button onClick={() => ref.current.click()} className="btn shadow-none"><i></i>Upload Photo</button>
                                                <button onClick={() => repositionCover()} className="btn shadow-none"><i></i>Reposition</button>
                                                <div className="divider1"></div>
                                                <button onClick={() => removeCover()} className="btn shadow-none"><i></i>Remove</button>
                                            </div>
                                        }
                                    </div>
                                </div> : null
                        }
                    </div>
                </div>
                <div className="profile_user_info">
                    <div className="container">
                        <div className="col-lg-10 m-auto">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="user_xxx_vg d-flex">
                                        <div className="profile_image">
                                            <div className="image">
                                                {
                                                    loading ?
                                                        <PictureLoading /> :
                                                        <>
                                                            <img src={profile.picture && profile.picture} alt="picture" />
                                                            {
                                                                user.username == username ?
                                                                    <span onClick={() => setPictureModal(true)}><BsFillCameraFill /></span>
                                                                    : null
                                                            }
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div className="right_user_name__info">
                                            {
                                                loading ?
                                                    <ProfileNameLoadingJsx /> :
                                                    <>
                                                        <h2>{profile && profile.first_name + " " + profile.last_name}</h2>
                                                        <span>{profile.friends && profile.friends.length} Friends</span>
                                                        <div className="all_friends_profile_icons">
                                                            {
                                                                profile.friends && profile.friends.slice(0, 5).map((x, i) => (
                                                                    <div key={i} className="show_my_friend_into_profile">
                                                                        <img title={x.first_name + " " + x.last_name} src={x.picture} alt="" />
                                                                    </div>
                                                                ))
                                                            }
                                                            {
                                                                profile.friends && profile.friends.length > 5 &&
                                                                <div className="show_my_friend_into_profile">
                                                                    <span>+{profile.friends && profile.friends.length - 5}</span>
                                                                </div>
                                                            }
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    {
                                        user.username == username ?
                                            <>
                                                <div className="d-flex action_story_edit">
                                                    <button onClick={() => navigate("/story")} className="btn shadow-none btn-primary">
                                                        <span><AiFillPlusCircle /></span> Add to story
                                                    </button>
                                                    <button onClick={() => setEditInfoModal(true)} className="btn shadow-none">
                                                        <span><BsPencilFill /></span> Edit Profile
                                                    </button>
                                                </div>
                                                <EditUserInfo setPictureModal={setPictureModal} setEditInfoModal={setEditInfoModal} editInfoModal={editInfoModal} />
                                            </> :
                                            <>
                                                <div className="d-flex action_story_edit">
                                                    {
                                                        findFriends ?
                                                            <button className="btn shadow-none btn-secondary">
                                                                <span><FaUserCheck /></span> Friends
                                                            </button> :
                                                            <button className="btn shadow-none btn-primary">
                                                                <span><FaUserPlus /></span> Add Friend
                                                            </button>
                                                    }
                                                    <button className="btn shadow-none">
                                                        <span><BsMessenger /></span> Message
                                                    </button>
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heading
import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../Components/Nav/Nav'
import './profile.css'
import Heading from '../../Components/Profile/Heading';
import { allFriendsAction, getAllPhotos, getDetailsAction } from '../../Redux/Actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import About from '../../Components/Profile/AboutSide/About';
import CreatePost from '../../Components/Common/CreatePost/CreatePost';
import Post from '../../Components/Common/Post/Post';
import { getMyPostAction, viewPhotoAction } from '../../Redux/Actions/PostActions';
import PictureModal from '../../Components/Profile/ProfilePicture/PicuterModal';
import ProfileMenuBar from '../../Components/Profile/AboutMenu/ProfileMenuBar';
import AboutMenu from '../../Components/Profile/AboutMenu/AboutMenu';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import PostLoading from '../../Components/Common/Loading/PostLoading';
import Friends from '../../Components/Profile/AboutMenu/Friends/Friends';
import ItemLoading from '../../Components/Common/Loading/ItemLoading';
import PhotoItem from '../../Components/Profile/AboutMenu/Photos/PhotoItem';
import { BsThreeDots } from 'react-icons/bs';

function Profile() {
    const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' })
    //get profile data
    const { username } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailsAction(username))
        dispatch(getMyPostAction(username))
        dispatch(allFriendsAction(username))
        const info = { max: 15, folder: "" }
        dispatch(getAllPhotos(info))
    }, [dispatch])
    const AllPhotoState = useSelector(x => x.allPhotos)
    const postState = useSelector(x => x.myPost)
    const { profile } = useSelector(x => x.user)


    // Fixed About sidebar
    const heightRef = useRef(0)
    const [fixed, setFixed] = useState(false)
    const sideBarHeight = heightRef.current && heightRef.current.offsetHeight
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > sideBarHeight) {
                setFixed(true);
            } else {
                setFixed(false)
            }
        });
    }, [sideBarHeight, window.pageYOffset])
    // console.log(heightRef.current.pageYOffset)

    // Show Picture and Cover MOdal
    const [pictureModal, setPictureModal] = useState(false)
    // Profile menu Tab
    const [profileMenu, setProfileMenu] = useState('posts')
    const [editInfoModal, setEditInfoModal] = useState(false)

    const [postModal, setPostModal] = useState(false)

    const allImage = AllPhotoState.photos && AllPhotoState.photos.map(x => x.secure_url)
    const navigate = useNavigate()
    const navigateTo = () => {
        dispatch(viewPhotoAction(allImage))
        navigate("/view_image")
    }


    return (
        <div className='profile_section_ui'>
            <div className="top_bars">
                <Nav setPostModal={setPostModal} />
                <div className="profile_heading__info">
                    <Heading setEditInfoModal={setEditInfoModal} editInfoModal={editInfoModal} setPictureModal={setPictureModal} pictureModal={pictureModal} />
                    <PictureModal setPictureModal={setPictureModal} pictureModal={pictureModal} />
                </div>
                {/* profile Menu */}
                <div className="profile_user_info">
                    <div className="container gx-0">
                        <div className='col-lg-10 m-auto'>
                            <div className="divider1"></div>
                            <ProfileMenuBar profileMenu={profileMenu} setProfileMenu={setProfileMenu} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky_profile_user_about_and_post">
                <div className="container gx-0">
                    <div className=" col-xl-10 m-auto">
                        {
                            profileMenu == "posts" ?
                                <div className="row">
                                    <div className="col-md-5">
                                        <div ref={heightRef} className={`${isMdScreen ? fixed ? "about_side_profile" : "x" : "x"}`}>
                                            <About setEditInfoModal={setEditInfoModal} editInfoModal={editInfoModal} />
                                        </div>
                                    </div>
                                    <div className="col-md-7" >

                                        {postState.loading ?
                                            <>
                                                <PostLoading />
                                                <PostLoading />
                                                <PostLoading />
                                                <PostLoading />
                                                <PostLoading />
                                            </> :
                                            <>
                                                <CreatePost modal={postModal} setModal={setPostModal} />
                                                {
                                                    postState.post.map((x, i) => (
                                                        <Post key={i} post={x} />
                                                    ))
                                                }
                                            </>
                                        }
                                    </div>
                                </div> :
                                profileMenu == "about" ?
                                    <>
                                        <div className="min_height_tab">
                                            <div className="about_details_ld">
                                                <AboutMenu />
                                            </div>
                                            <div className="friends_all_show_rr">
                                                <div className="friends_all_heading_con_rr">
                                                    <h5>Friends</h5>
                                                    <div className="right_all_pp">
                                                        <button onClick={() => navigate('/friends')} className="btn ms-1 shadow-none text-primary">Friend Requests</button>
                                                        <button onClick={() => navigate('/friends')} className="btn ms-1 shadow-none text-primary">Find Friend</button>
                                                        <button className="btn ms-1 shadow-none text-primary"><BsThreeDots /></button>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {
                                                        profile.friends && profile.friends.slice(0, 20).map((x, i) => (
                                                            <Friends friends={x} key={i} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="friends_all_show_rr">
                                                <div className="friends_all_heading_con_rr">
                                                    <h5>Photos</h5>
                                                    <div className="right_all_pp">
                                                        <button className="btn ms-1 shadow-none text-primary">Add Photo/Video</button>
                                                        <button className="btn ms-1 shadow-none text-primary"><BsThreeDots /></button>
                                                    </div>
                                                </div>
                                                <div className="row gx-2">
                                                    {
                                                        AllPhotoState.loading ?
                                                            <>
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                            </> :
                                                            AllPhotoState.photos ?
                                                                AllPhotoState.photos.map((x, i) => (
                                                                    <PhotoItem navigateTo={navigateTo} item={x} key={i} />
                                                                )) : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </> :

                                    profileMenu == "friends" ?
                                        <div className="min_height_tab">
                                            <div className="row">
                                                {
                                                    profile.friends && profile.friends.map((x, i) => (
                                                        <Friends friends={x} key={i} />
                                                    ))
                                                }
                                            </div>
                                        </div> :
                                        profileMenu == "photos" ?
                                            <div className="min_height_tab">
                                                <div className="row">

                                                    {
                                                        AllPhotoState.loading ?
                                                            <>
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                                <ItemLoading />
                                                            </> :
                                                            AllPhotoState.photos ?
                                                                AllPhotoState.photos.map((x, i) => (
                                                                    <PhotoItem navigateTo={navigateTo} item={x} key={i} />
                                                                )) : null
                                                    }
                                                </div>
                                            </div> :
                                            profileMenu == "videos" ?
                                                <div className="min_height_tab">

                                                </div> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
import React, { useState, useEffect } from 'react'
import ItemLoading from '../../Common/Loading/ItemLoading'
import WorkItem from './WorkItem'
import AllItem from './AllItem'
import SocialItem from './SocialItem'
import Bio from './Bio'
import HobbiesItems from './HobbiesItems';
import FeaturePhoto from './FeaturePhoto'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import Footer from './Footer'
import { useMediaQuery } from 'react-responsive'
import DetailsModal from './DetailsModal'
import { getAllPhotos } from '../../../Redux/Actions/UserAction'
import Friends from '../Friends/Friends'
import FeatureModal from '../FeaturePhoto/FeatureModal'
import EditUserInfo from '../EditUserInfo'
import HobbiesModal from './HobbiesModal'
import TextLoading from '../../Common/Loading/TextLoading'
function About({ setEditInfoModal, editInfoModal }) {

    const dispatch = useDispatch()
    useEffect(() => {
        const info = { max: 15, folder: "" }
        dispatch(getAllPhotos(info))
    }, [dispatch])
    const { username } = useParams()
    const { user } = useSelector(x => x.auth)

    const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' })
    const [bio, setBio] = useState(false)
    const { profile, loading } = useSelector(x => x.user)
    const photoState = useSelector(x => x.allPhotos)
    const [editDetailModal, setEditDetailModal] = useState(false)
    const [featurePhotoModal, setFeaturePhotoModal] = useState(false)
    const [hobbiesModal, setHobbiesModal] = useState(false)



    return (
        <>
            <div className="about_user_profile_sticky">
                <div className="lock_profile_xv shadow">
                    <div className="lock_icon_profile">
                        <span></span>
                    </div>
                    <div className="info_ss_lock">
                        <h4>You locked your profile</h4>
                        <a href='/' target="_blank">Learn more</a>
                    </div>
                </div>
            </div>
            <div className="about_intro_info shadow">
                <h4>Intro</h4>
                <div className="user_profile_bio_x">
                    <Bio setBio={setBio} bio={bio} />
                </div>
                {/* Work Section */}
                <div className="user_work_section_all_xs my-3 user_info_data_xsc">
                    {
                        loading ?
                            <div className='row w-100 m-auto' >
                                <TextLoading w="100%" />
                                <TextLoading w="100%" />
                                <TextLoading w="100%" />
                            </div> :
                            profile.work && profile.work.map((x, i) => (
                                <WorkItem x={x} key={i} />
                            ))
                    }
                </div>
                {/* Live In */}
                <AllItem />

                {/* Social Link status*/}
                <div className="user_from_district ">
                    <SocialItem />
                </div>
                {
                    username == user.username ?
                        <button onClick={() => setEditDetailModal(true)} className="btn w-100 shadow-none edit_details_action_xc">Edit Details</button>
                        : null
                }

                <DetailsModal setEditInfoModal={setEditInfoModal} setEditDetailModal={setEditDetailModal} editDetailModal={editDetailModal} />
                <EditUserInfo setEditInfoModal={setEditInfoModal} editInfoModal={editInfoModal} />
                {/*Hobbes */}
                <div className="hobbies_section_all_xdw">
                    <div className="hobbies_all_s">

                        {
                            loading ?
                                <div className='row w-100 m-auto' >
                                    <TextLoading w="25%" />
                                    <TextLoading w="25%" />
                                    <TextLoading w="25%" />
                                    <TextLoading w="25%" />
                                    <TextLoading w="25%" />
                                    <TextLoading w="25%" />
                                    <TextLoading w="25%" />
                                    <TextLoading w="25%" />
                                </div> :
                                profile.hobbies && profile.hobbies.length > 0 ?
                                    profile.hobbies.map((x, i) => (
                                        <HobbiesItems item={x} key={i} />
                                    )) : null
                        }
                        {
                            profile.hobbies && profile.hobbies.length > 0 &&
                            <span>
                                See All
                            </span>
                        }
                    </div>
                    {
                        username == user.username ?
                            <div className="action_modify_hobbies">
                                <button onClick={() => setHobbiesModal(true)} className="btn shadow-none w-100">Edit hobbies</button>
                            </div> : null
                    }
                    <HobbiesModal setHobbiesModal={setHobbiesModal} hobbiesModal={hobbiesModal} />
                </div>
                {/* Featured Photos */}
                <div className="featured_photos_six">
                    <FeaturePhoto setFeaturePhotoModal={setFeaturePhotoModal} />
                    <FeatureModal featurePhotoModal={featurePhotoModal} setFeaturePhotoModal={setFeaturePhotoModal} />
                </div>
            </div>
            {/* Photos*/}
            <div className="all_photos_profile_users_scx">
                <div className="photos_heading_section_fg">
                    <h4>Photos</h4>
                    <Link to="/">See all photos</Link>
                </div>
                <div className="row all_photos_about_sec">
                    {
                        photoState.loading ?
                            <>
                                <ItemLoading />
                                <ItemLoading />
                                <ItemLoading />
                                <ItemLoading />
                                <ItemLoading />
                                <ItemLoading />
                            </> :
                            photoState.photos.slice(0, 9).map((x, i) => (
                                <div className="col-4 gx-1" key={i}>
                                    <div className="image_item_user" >
                                        <img src={x.secure_url} alt="image" />
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
            {/* All Friends*/}
            <div className="friends_all_profile_section_new shadow">
                <div className="heading_friends_all">
                    <div className="left">
                        <h4>Friends</h4>
                        <span>{profile.friends && profile.friends.length} friends</span>
                    </div>
                    <div className="right">
                        <Link to="/friends">See all friends</Link>
                    </div>
                </div>
                <div className="all_friends_ppp">
                    <div className="row">
                        {
                            loading ?
                                <>
                                    <ItemLoading />
                                    <ItemLoading />
                                    <ItemLoading />
                                    <ItemLoading />
                                    <ItemLoading />
                                    <ItemLoading />
                                </> :
                                profile.friends && profile.friends.slice(0, 9).map((x, i) => (
                                    <Friends key={i} friend={x} />
                                ))
                        }
                    </div>
                </div>
            </div>

            {/* Footer About */}
            {
                isMdScreen &&
                <div className="about_profile_side_footer">
                    <Footer />
                </div>
            }

        </>
    )
}

export default About
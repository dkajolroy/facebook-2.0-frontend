import React from 'react'
import { useState } from 'react'
import { BsFacebook, BsGearFill } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createStoryAction } from '../../Redux/Actions/StoryActions'

function SideBar({ image, setImage, setLoading }) {
    const navigate = useNavigate()
    const { user } = useSelector(x => x.auth)
    const dispatch = useDispatch()



    const submitStory = async () => {
        setLoading(true)
        await dispatch(createStoryAction({ image }))
        setLoading(false)
        navigate("/")
    }
    const discardStory = () => {
        setImage("")
    }

    return (
        <div className="side_bars_of_story">
            <div className="story_icons_info">
                <span onClick={() => navigate(-1)}><CgClose /></span>
                <span><BsFacebook /></span>
            </div>
            <div className="label_of_story_flex">
                <span>
                    Your Story
                </span>
                <span><BsGearFill /></span>
            </div>
            <div className="user_profile_users_get">
                <div className="images_users_iss">
                    <img src={user && user.picture} alt="user" />
                </div>
                <div className="users_name_info_stt">
                    <h4>{user && user.first_name + " " + user.last_name}</h4>
                </div>
            </div>
            <hr />

            {/* Save Image Story Button visible or hidden */}
            {
                image &&
                <div className="button_grope_of_save_story_xx">
                    <button onClick={discardStory} className="px-3 me-2 py-1 btn shadow-none btn-secondary">Discard</button>
                    <button onClick={submitStory} className="px-3 py-1 btn shadow-none btn-primary">Share to story</button>
                </div>
            }

        </div>
    )
}

export default SideBar
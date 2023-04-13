import React from 'react'
import { RiAlarmFill } from 'react-icons/ri'
import { BiWifi } from 'react-icons/bi'
import { IoHomeSharp } from 'react-icons/io5'
import { HiLocationMarker } from 'react-icons/hi'
import { BsFillHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

function AllItem() {

    const { profile, loading } = useSelector(x => x.user)

    const [signUpTime, setSignUpTime] = useState()
    useEffect(() => {
        setSignUpTime(profile && profile.createdAt)
    }, [profile])


    return (
        <>
            {
                loading ?
                    null
                    :
                    <>
                        {
                            profile.details && profile.details.currentCity.name &&
                            <div className="user_live_in_xs user_info_data_xsc d-flex">
                                <div className="section_icon_all_xx">
                                    <span><IoHomeSharp /></span>
                                </div>
                                <div className="title_heading_info_xx">
                                    <h4>Live in <span>{profile.details && profile.details.currentCity.name}</span></h4>
                                </div>
                            </div>
                        }
                        {/* From */}
                        {
                            profile.details && profile.details.homeTown.name &&
                            <div className="user_from_district user_info_data_xsc d-flex">
                                <div className="section_icon_all_xx">
                                    <span><HiLocationMarker /></span>
                                </div>
                                <div className="title_heading_info_xx">
                                    <h4>From <span>{profile.details.homeTown.name}</span></h4>
                                </div>
                            </div>
                        }
                        {/* Relation status*/}
                        {
                            profile.details && profile.details.relationship &&
                            <div className="user_from_district user_info_data_xsc d-flex">
                                <div className="section_icon_all_xx">
                                    <span><BsFillHeartFill /></span>
                                </div>
                                <div className="title_heading_info_xx">
                                    <h4>{profile.details.relationship}</h4>
                                </div>
                            </div>
                        }
                        {/* Join status*/}
                        <div className="user_from_district user_info_data_xsc d-flex">
                            <div className="section_icon_all_xx">
                                <span><RiAlarmFill /></span>
                            </div>
                            <div className="title_heading_info_xx">
                                <h4> {"Joined" + " " + new Date(signUpTime && signUpTime).toDateString().split(" ")[1] + " " + new Date(signUpTime && signUpTime).getFullYear()}</h4>
                            </div>
                        </div>
                        {/* Follower status*/}
                        <div className="user_from_district user_info_data_xsc d-flex">
                            <div className="section_icon_all_xx">
                                <span><BiWifi /></span>
                            </div>
                            <div className="title_heading_info_xx">
                                <h4>Followed by <span>{`${profile.followers && profile.followers.length} people`}</span></h4>
                            </div>
                        </div>

                    </>
            }
        </>
    )
}

export default AllItem
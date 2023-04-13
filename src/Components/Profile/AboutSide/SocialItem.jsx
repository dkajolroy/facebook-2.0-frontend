import React from 'react'
import { BsInstagram, BsLinkedin, BsPinterest, BsTwitter } from 'react-icons/bs'
import { FaTumblr } from 'react-icons/fa'
import { IoLogoYoutube } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TextLoading from '../../Common/Loading/TextLoading'

function SocialItem() {
    const { profile, loading } = useSelector(x => x.user)
    const social = profile.details && profile.details.social
    return (
        <>
            {
                loading ?
                    <div className=' w-100  mb-2 mx-auto' >
                        <TextLoading w="20%" />
                        <TextLoading w="30%" />
                        <TextLoading w="40%" />
                        <TextLoading w="50%" />
                    </div>
                    :
                    <>

                        {
                            social?.youtube ?
                                <div className="d-flex my-2" >
                                    <div className="logo_social_items youtube me-1">
                                        <span><IoLogoYoutube /></span>
                                    </div>
                                    <div className="title">
                                        <Link to="/">{social.youtube}</Link>
                                    </div>
                                </div> : null
                        }
                        {
                            social?.twitter ?
                                <div className="d-flex my-2" >
                                    <div className="logo_social_items twitter me-1">
                                        <span><BsTwitter /></span>
                                    </div>
                                    <div className="title">
                                        <Link to="/">{social.twitter}</Link>
                                    </div>
                                </div> : null
                        }
                        {
                            social?.linkedin ?
                                <div className="d-flex my-2" >
                                    <div className="logo_social_items twitter me-1">
                                        <span><BsLinkedin /></span>
                                    </div>
                                    <div className="title">
                                        <Link to="/">{social.linkedin}</Link>
                                    </div>
                                </div> : null
                        }
                        {
                            social?.pinterest ?
                                <div className="d-flex my-2" >
                                    <div className="logo_social_items pinterest me-1">
                                        <span><BsPinterest /></span>
                                    </div>
                                    <div className="title">
                                        <Link to="/">{social.pinterest}</Link>
                                    </div>
                                </div> : null
                        }
                        {
                            social?.instagram ?
                                <div className="d-flex my-2" >
                                    <div className="logo_social_items instagram me-1">
                                        <span><BsInstagram /></span>
                                    </div>
                                    <div className="title">
                                        <Link to="/">{social.instagram}</Link>
                                    </div>
                                </div> : null
                        }
                        {
                            social?.tumbler ?
                                <div className="d-flex my-2" >
                                    <div className="logo_social_items tumbler me-1">
                                        <span><FaTumblr /></span>
                                    </div>
                                    <div className="title">
                                        <Link to="/">{social.tumbler}</Link>
                                    </div>
                                </div> : null
                        }
                    </>
            }
        </>
    )
}

export default SocialItem
import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaPen, FaTumblr } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md'
import TextLoading from '../../../Common/Loading/TextLoading'
import './all.css'
import { BiLinkAlt, BiWorld } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { IoLogoYoutube } from 'react-icons/io'
import { emailAddressAction, phonNumberAction, socialLinkAddAction, websiteAddAction } from '../../../../Redux/Actions/UserAction';
import { useState } from 'react';
import { BsFillTelephoneFill, BsInstagram, BsLinkedin, BsPinterest, BsTwitter, BsYoutube } from 'react-icons/bs';

function ContactInfo() {
    const dispatch = useDispatch()
    const { profile, loading } = useSelector(x => x.user)
    const { user } = useSelector(x => x.auth)

    const [addSocial, setAddSocial] = useState(false)
    const [selectForm, setSelectForm] = useState('')
    const [selectInput, setSelectInput] = useState('')
    const [formLoading, setFormLoading] = useState(false)

    const submitForm = async () => {
        setFormLoading(true)
        const data = { social: selectForm, link: selectInput }
        await dispatch(socialLinkAddAction(data))
        setFormLoading(false)
    }




    const [phonNumber, setPhonNumber] = useState('')
    const [phonTable, setPhonTable] = useState(false)
    const submitPhone = () => {
        if (!phonNumber.trim()) { return } else {
            dispatch(phonNumberAction({ number: phonNumber }))
            setPhonTable(false)
        }
    }
    const [emailTable, setEmailTable] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const submitEmail = () => {
        if (!emailValue.trim()) { return } else {
            dispatch(emailAddressAction({ email: emailValue }))
            setEmailTable(false)
        }
    }

    const [websiteTable, setWebsiteTable] = useState(false)
    const [website, setWebsite] = useState('')
    const submitWebsite = () => {
        if (!website.trim()) { return } else {
            dispatch(websiteAddAction({ website }))
            setWebsiteTable(false)
        }
    }


    return (
        <div className='contact_info_edit_mei'>
            <div className="contact_info_ww">
                <div className="heading_of_contact_info">
                    <h6>Contact Info</h6>
                </div>
                {/* Items add email or number */}
                {
                    loading ?
                        <>
                            <TextLoading w="80%" />
                            <TextLoading w="80%" />
                            <TextLoading w="80%" />
                        </> :
                        profile.username == user.username ?
                            phonTable ?
                                <div className="table_of_change_phone title_of_work my-2">
                                    <input onChange={(e) => setPhonNumber(e.target.value)} type="text" className='form-control w-50 shadow-none py-1' placeholder='Enter Phone' />
                                    <div className="divider"></div>
                                    <div className="action_button_of_phone">
                                        <button onClick={() => setPhonTable(false)} className="btn btn-secondary shadow-none py-1 me-2">Cancel</button>
                                        <button onClick={submitPhone} className="btn btn-primary shadow-none py-1 px-4">Save</button>
                                    </div>
                                </div> :
                                <>
                                    <div onClick={() => setPhonTable(true)} className="item_of_contact">
                                        <i><AiOutlinePlusCircle /></i>
                                        <span>{profile.phone && profile.phone ? "Update a phone number" : "Add a phone number"}</span>
                                    </div>
                                    {
                                        profile.phone && profile.phone ?
                                            <div className="phone_number_show">
                                                <span><BsFillTelephoneFill /></span>
                                                <span>{profile.phone}</span>
                                            </div> : null
                                    }
                                </>
                            : null
                }
                {
                    profile.username == user.username ?
                        emailTable ?
                            <div className="table_of_change_phone title_of_work my-3">
                                <input onChange={(e) => setEmailValue(e.target.value)} type="text" className='form-control w-50 shadow-none py-1' placeholder='Enter your address' />
                                <div className="divider"></div>
                                <div className="action_button_of_phone">
                                    <button onClick={() => setEmailTable(false)} className="btn btn-secondary shadow-none py-1 me-2">Cancel</button>
                                    <button onClick={submitEmail} className="btn btn-primary shadow-none py-1 px-4">Save</button>
                                </div>
                            </div> :
                            <>
                                <div onClick={() => setEmailTable(true)} className="item_of_contact">
                                    <i><AiOutlinePlusCircle /></i>
                                    <span>{profile.email && profile.email ? "Update your address" : "Add your address"}</span>
                                </div>
                                {
                                    profile.email && profile.email ?
                                        <div className="phone_number_show">
                                            <span><MdEmail /></span>
                                            <span>{profile.email}</span>
                                        </div> : null
                                }
                            </>
                        : null
                }
            </div>
            {/* Web Site add or show */}
            <div className="social_link_and_website_vv">
                <div className="heading_of_contact_info">
                    <h6>Website and social links</h6>
                </div>

                <div className="website_of_user_cc">
                    <div className="left_of_web">
                        {
                            loading ?
                                <div style={{ height: "40px", width: "300px" }}>
                                    <TextLoading w="80%" />
                                    <TextLoading w="80%" />
                                    <TextLoading w="80%" />
                                </div> :
                                profile.username == user.username ?
                                    websiteTable ?
                                        <div className="table_of_change_phone title_of_work my-2">
                                            <input onChange={(e) => setWebsite(e.target.value)} type="text" className='form-control shadow-none py-1' placeholder='Enter website' />
                                            <div className="divider"></div>
                                            <div className="action_button_of_phone">
                                                <button onClick={() => setWebsiteTable(false)} className="btn btn-secondary shadow-none py-1 me-2">Cancel</button>
                                                <button onClick={submitWebsite} className="btn btn-primary shadow-none py-1 px-4">Save</button>
                                            </div>
                                        </div> :
                                        <>
                                            {
                                                profile.details && profile.details.website ?
                                                    <div className="phone_number_show">
                                                        <span><BiLinkAlt /></span>
                                                        <Link to="/">{profile.details && profile.details.website}</Link>
                                                    </div> :
                                                    <button onClick={() => setWebsiteTable(true)} className="btn shadow-none text-primary">
                                                        <span><BiLinkAlt /></span>
                                                        add website
                                                    </button>
                                            }
                                        </>
                                    : null
                        }
                    </div>
                    {
                        profile.username == user.username &&
                        <div className="right_of_web">
                            <div className="icon2">
                                <i><BiWorld /></i>
                                <i onClick={() => setWebsiteTable(prev => !prev)}><FaPen /></i>
                            </div>
                        </div>
                    }

                </div>

                <div className="all_items_of_social_links">
                    <div className="left_of_social_link_edit">
                        <div className="added_social_link_value">
                            {
                                profile.details && profile.details.social.youtube ?
                                    <div className="social_items_mm d-flex my-2" >
                                        <div className="logo youtube me-1">
                                            <i><IoLogoYoutube /></i>
                                        </div>
                                        <div className="title">
                                            <h6>{profile.details.social.youtube}</h6>
                                            <span>Youtube</span>
                                        </div>
                                    </div> : null
                            }
                            {
                                profile.details && profile.details.social.linkedin ?
                                    <div className="d-flex my-2" >
                                        <div className="logo linkedin me-1">
                                            <i><BsLinkedin /></i>
                                        </div>
                                        <div className="title">
                                            <h6>{profile.details.social.linkedin}</h6>
                                            <span>Linkedin</span>
                                        </div>
                                    </div> : null
                            }
                            {
                                profile.details && profile.details.social.twitter ?
                                    <div className="d-flex my-2" >
                                        <div className="logo twitter me-1">
                                            <i><BsTwitter /></i>
                                        </div>
                                        <div className="title">
                                            <h6>{profile.details.social.twitter}</h6>
                                            <span>Twitter</span>
                                        </div>
                                    </div> : null
                            }
                            {
                                profile.details && profile.details.social.instagram ?
                                    <div className="d-flex my-2" >
                                        <div className="logo instagram me-1">
                                            <i><BsInstagram /></i>
                                        </div>
                                        <div className="title">
                                            <h6>{profile.details.social.instagram}</h6>
                                            <span>Instagram</span>
                                        </div>
                                    </div> : null
                            }
                            {
                                profile.details && profile.details.social.pinterest ?
                                    <div className="d-flex my-2" >
                                        <div className="logo pinterest me-1">
                                            <i><BsPinterest /></i>
                                        </div>
                                        <div className="title">
                                            <h6>{profile.details.social.pinterest}</h6>
                                            <span>Pinterest</span>
                                        </div>
                                    </div> : null
                            } {profile.details && profile.details.social.tumbler ?
                                <div className="d-flex my-2" >
                                    <div className="logo tumbler me-1">
                                        <i><FaTumblr /></i>
                                    </div>
                                    <div className="title">
                                        <h6>{profile.details.social.tumbler}</h6>
                                        <span>Tumbler</span>
                                    </div>
                                </div> : null
                            }
                        </div>
                        {
                            addSocial &&
                            <div className="new_social_add_items_ll">

                                <div className="all_select_to">
                                    <div className="name_of_soc me-2">
                                        <input onChange={(e) => setSelectInput(e.target.value)} type="text" placeholder='Username' className='form-control shadow-none' />
                                    </div>
                                    <div className="brand_cd">
                                        <select onChange={(e) => setSelectForm(e.target.value)} name='select' className='form-select shadow-none'>
                                            <option value={null} >Select</option>
                                            <option value="youtube">Youtube</option>
                                            <option value="twitter">Twitter</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="linkedin">Linkedin</option>
                                            <option value="tumbler">Tumbler</option>
                                            <option value="pinterest">Pinterest</option>
                                        </select>
                                    </div>
                                </div>
                                <hr />
                                <div className="action_to_operation">
                                    <button onClick={() => setAddSocial(false)} className="btn py-1 shadow-none me-2 btn-secondary">Cancel</button>
                                    <button onClick={() => submitForm()} type='submit' className="btn py-1 px-4 shadow-none btn-primary">Save</button>
                                </div>
                            </div>
                        }
                        {/* Add Social Button */}
                        {
                            profile.username == user.username ?
                                addSocial ? "" :
                                    <div onClick={() => setAddSocial(true)} className="item_of_add_social">
                                        <i><AiOutlinePlusCircle /></i>
                                        <span>Add Social Links</span>
                                    </div> : null
                        }

                    </div>
                    {
                        profile.username == user.username ?
                            <div className="right_of_social_link_edi">
                                <i><BiWorld /></i>
                                <i><FaPen /></i>
                            </div> : null
                    }
                </div>
            </div>

        </div>
    )
}

export default ContactInfo
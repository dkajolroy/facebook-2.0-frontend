import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiWorld } from 'react-icons/bi'
import { BsSuitHeartFill, BsThreeDots } from 'react-icons/bs'
import TextLoading from '../../../Common/Loading/TextLoading'
import { relationship } from '../../../../Redux/Actions/UserAction'

function Family() {
    //Redux
    const dispatch = useDispatch()
    const { profile, loading } = useSelector(x => x.user)
    const { user } = useSelector(x => x.auth)

    const [relationStatus, setRelationStatus] = useState(false)
    const [relationValue, setRelationValue] = useState('')
    const submitRelation = () => {
        if (!relationValue.trim()) { return } else {
            dispatch(relationship({ status: relationValue }))
            setRelationStatus(false)
        }
    }
    return (
        <div className='overview_about_sec_gg'>
            <div className="heading_of_contact_info">
                <h6>Relational Status</h6>
            </div>
            {/* Relational Status In */}
            <div className="work_item_about_ppp">
                <div className="left_bar">
                    <i className='icon_ll'><BsSuitHeartFill /></i>
                    <div className="heading_work_menu_tt new_social_add_items_ll ">
                        {
                            relationStatus ?
                                <div className='add_all'>
                                    <select onChange={(e) => setRelationValue(e.target.value)} className='form-select shadow-none py-1 '>
                                        <option >Choose</option>
                                        <option value="Single">Single</option>
                                        <option value="In a Relationship">In a Relationship</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                    </select>
                                    <div className="divider"></div>
                                    <div className="action_all_to">
                                        <button onClick={() => setRelationStatus(prev => !prev)} className="btn shadow-none me-2 py-1 btn-secondary">Cancel</button>
                                        <button onClick={submitRelation} className="btn shadow-none py-1 px-4 btn-primary">Save</button>
                                    </div>
                                </div> :
                                loading ?
                                    <div style={{ width: "200px", height: "40px" }}>
                                        <TextLoading w='100%' />
                                    </div> :
                                    <h6 className="title_of_work">
                                        {`${profile.details && profile.details.relationship && profile.details.relationship}`}
                                    </h6>
                        }
                    </div>
                </div>
                {
                    profile.username == user.username ?
                        <div className="right_bar">
                            <i className='icon_ll'><BiWorld /></i>
                            <i onClick={() => setRelationStatus(prev => !prev)} className='icon_ll'><BsThreeDots /></i>
                        </div> : null
                }
            </div>

            {/* Family Members  */}
            <div className="heading_of_contact_info">
                <h6>Family Members</h6>
            </div>
        </div>
    )
}

export default Family
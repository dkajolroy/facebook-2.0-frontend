import React from 'react'
import { useState } from 'react'
import WorkItem from './WorkItem'
import TextLoading from '../../../Common/Loading/TextLoading'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { workAddAction } from '../../../../Redux/Actions/UserAction'

function Work() {
    const dispatch = useDispatch()
    const { profile, loading } = useSelector(x => x.user)
    const { user } = useSelector(x => x.auth)

    const [workForm, setWorkForm] = useState(false)
    const [work, setWork] = useState('')
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [subMitLoading, setSubmitLoading] = useState(false)

    const submitWork = async () => {
        if (!work.trim() || !company.trim() || !position) { return } else {
            const data = { desc: work, company, position }
            setSubmitLoading(true)
            await dispatch(workAddAction(data))
            setSubmitLoading(false)
            setWorkForm(false)
        }
    }


    return (
        <div className='overview_about_sec_gg' >
            <div className="heading_of_contact_info">
                <h6>Work </h6>
            </div>


            {/* Work */}
            {
                loading ?
                    <>
                        <TextLoading w="80%" />
                        <TextLoading w="80%" />
                    </> :
                    profile.work && profile.work.map((x, i) => (
                        <WorkItem x={x} key={i} />
                    ))
            }

            {/* Add Work  */}
            {
                workForm ?
                    <div className="work_form_to_submit animate__animated animate__fadeIn">
                        <label htmlFor="desc">
                            Description
                        </label>
                        <textarea onChange={(e) => setWork(e.target.value)} className='form-control w-50 mt-1 shadow-none' placeholder='Work description' id='desc' ></textarea>
                        <label htmlFor="desc">
                            Company
                        </label>
                        <input onChange={(e) => setCompany(e.target.value)} className='form-control w-50 mt-1 shadow-none' type="text" placeholder='Company' />
                        <label htmlFor="desc">
                            Position
                        </label>
                        <input onChange={(e) => setPosition(e.target.value)} className='form-control w-50 mt-1 shadow-none' type="text" placeholder='Position' />
                        <div className="action_of_new_work">
                            <button onClick={() => setWorkForm(p => !p)} className="btn btn-secondary shadow-none py-1 me-2">Cancel</button>
                            <button onClick={submitWork} className="btn btn-primary shadow-none py-1 px-4">
                                {subMitLoading ?
                                    <>
                                        <div className="spinner-grow spinner-grow-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div><div className="spinner-grow spinner-grow-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div><div className="spinner-grow spinner-grow-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </> : "Save"
                                }
                            </button>
                        </div>
                    </div> :
                    profile.username == user.username ?
                        <div onClick={() => setWorkForm(p => !p)} className="add_work_item_to_acc">
                            <i><AiOutlinePlusCircle /></i>
                            <span>Add Work</span>
                        </div> : null
            }
            <div className="heading_of_contact_info">
                <h6>Education</h6>
            </div>
            <div className="all_education_items_">
                {
                    profile && profile.username == user.username ?
                        <div className="add_work_item_to_acc">
                            <i><AiOutlinePlusCircle /></i>
                            <span>Add Education</span>
                        </div> : null
                }
            </div>
        </div>
    )
}

export default Work
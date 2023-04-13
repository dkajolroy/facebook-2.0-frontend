import React from 'react'
import { useState } from 'react'
import { BiWorld } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { ImHome3 } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationOn } from 'react-icons/md'
import { CurrentCity, liveInCurrentCity } from '../../../../Redux/Actions/UserAction'
import TextLoading from '../../../Common/Loading/TextLoading'

function Place() {
    // GEt Value 
    const { profile, loading } = useSelector(x => x.user)
    const { user } = useSelector(x => x.auth)

    const [editLive, setEditLive] = useState(false)
    const [editFrom, setEditFrom] = useState(false)

    const [liveValue, setLiveValue] = useState('')
    const [fromValue, setFromValue] = useState('')

    const dispatch = useDispatch()
    const submit_liveIn = () => {
        if (!liveValue.trim()) { return }
        else {
            dispatch(liveInCurrentCity({ city: liveValue.trim() }))
            setEditLive(false)
        }
    }
    const submit_FromIn = () => {
        if (!fromValue.trim()) { return }
        else {
            dispatch(CurrentCity({ city: fromValue.trim() }))
            setEditFrom(false)
        }
    }

    return (
        <div className='overview_about_sec_gg'>
            <div className="heading_of_contact_info">
                <h6>Place Lived</h6>
            </div>

            {/* Live In */}
            <div className="work_item_about_ppp">
                <div className="left_bar">
                    <i className='icon_ll'><ImHome3 /></i>
                    <div className="heading_work_menu_tt">
                        {
                            editLive ?
                                <>

                                    <h6 className='title_of_work'> Live in
                                        <input onChange={(e) => setLiveValue(e.target.value)} type="text" className='form-control py-1 shadow-none' placeholder='Current City...' />
                                        <div className="action_of_save_">
                                            <div className="divider"></div>
                                            <button onClick={() => setEditLive(!editLive)} className="btn py-1 me-2 btn-secondary shadow-none">Cancel</button>
                                            <button onClick={submit_liveIn} className="btn py-1 px-4 btn-primary shadow-none">Save</button>
                                        </div>
                                    </h6>
                                </>
                                :

                                loading ?
                                    <div style={{ height: "50px", width: "300px" }} className="loading_ee">
                                        <TextLoading w="50%" />
                                    </div> :
                                    <h6 className="title_of_work">
                                        {`    Live in ${profile.details && profile.details.currentCity.name && profile.details.currentCity.name}`}
                                    </h6>

                        }
                    </div>
                </div>
                {
                    profile && profile.username == user.username ?
                        <div className="right_bar">
                            <i className='icon_ll'><BiWorld /></i>
                            <i onClick={() => setEditLive(!editLive)} className='icon_ll'><BsThreeDots /></i>
                        </div> : null
                }
            </div>
            {/* From  */}
            <div className="work_item_about_ppp">
                <div className="left_bar">
                    <i className='icon_ll'><MdLocationOn /></i>
                    <div className="heading_work_menu_tt">
                        {
                            editFrom ?
                                <>
                                    <h6 className='title_of_work'> From
                                        <input onChange={(e) => setFromValue(e.target.value)} type="text" className='form-control py-1 shadow-none' placeholder='Home Town...' />
                                        <div className="action_of_save_">
                                            <div className="divider"></div>
                                            <button onClick={() => setEditFrom((prev) => !prev)} className="btn py-1 me-2 btn-secondary shadow-none">Cancel</button>
                                            <button onClick={submit_FromIn} className="btn py-1 px-4 btn-primary shadow-none">Save</button>
                                        </div>
                                    </h6>
                                </>
                                :
                                loading ?
                                    <div style={{ height: "50px", width: "300px" }} className="loading_ee">
                                        <TextLoading w="50%" />
                                    </div> :
                                    <h6 className="title_of_work">
                                        {`    From ${profile.details && profile.details.homeTown.name && profile.details.homeTown.name}`}
                                    </h6>
                        }
                    </div>
                </div>
                {
                    profile && profile.username == user.username ?
                        <div className="right_bar">
                            <i className='icon_ll'><BiWorld /></i>
                            <i onClick={() => setEditFrom((prev) => !prev)} className='icon_ll'><BsThreeDots /></i>
                        </div> : null
                }
            </div>
        </div>
    )
}

export default Place
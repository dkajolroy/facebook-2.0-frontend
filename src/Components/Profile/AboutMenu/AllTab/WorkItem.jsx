import React, { useState } from 'react'
import { BiWorld } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { MdWork } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { removeWorkAction } from '../../../../Redux/Actions/UserAction'

function WorkItem({ x }) {
    const [workOption, setWorkOption] = useState(false)
    const dispatch = useDispatch()

    const removeWork = (workId) => {
        dispatch(removeWorkAction({ workId }))
        setWorkOption(false)
    }

    return (
        <div className="work_item_about_ppp">
            <div className="left_bar">
                <i className='icon_ll'><MdWork /></i>
                <div className="heading_work_menu_tt">
                    <h6 className="title_of_work">
                        {`${x.desc} ${x.position}`}
                        <span>at</span>{x.company}</h6>
                </div>
            </div>
            <div className="right_bar">
                <i className='icon_ll'><BiWorld /></i>
                <i onClick={() => setWorkOption(p => !p)} className='icon_ll'><BsThreeDots /></i>
            </div>
            {
                workOption ?
                    <div className="menu_bars_of_work">
                        <div className="action w-100">
                            <button onClick={() => removeWork(x._id)} className="btn w-100 py-1 btn shadow-none mb-1 btn-secondary">Delete</button>
                            <button className="btn w-100 py-1 btn shadow-none btn-primary">Edit</button>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default WorkItem
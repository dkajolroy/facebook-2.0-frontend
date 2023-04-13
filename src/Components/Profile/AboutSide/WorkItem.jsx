import React from 'react'
import { MdWork } from 'react-icons/md'

function WorkItem({ x }) {


    return (
        <div className=' d-flex work_items_lls'>
            <div className="section_icon_all_xx">
                <span><MdWork /></span>
            </div>
            <div className="company_name_info">
                <h4>{`${x.desc} ${x.position}`} at <span>{x.company}</span></h4>
            </div>
        </div>
    )
}

export default WorkItem
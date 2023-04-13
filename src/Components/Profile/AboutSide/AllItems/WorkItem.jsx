import React, { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'

function WorkItem({ navigateTOEdit, item }) {

    const [activeWork, setActiveWork] = useState(true)
    return (
        <>
            <div className="work_item" >
                <div className="left">
                    <label className="switch">
                        <input type="checkbox" onClick={() => setActiveWork(!activeWork)} defaultChecked={activeWork} />
                        <span className={`slider round ${activeWork ? "enable" : "disable"}`}></span>
                    </label>
                    <span className='span'>{`${item.desc} ${item.position} ${item.company}`}</span>
                </div>
                <div className="right">
                    <span onClick={() => navigateTOEdit()}><BsFillPencilFill /></span>
                </div>
            </div>
        </>
    )
}

export default WorkItem
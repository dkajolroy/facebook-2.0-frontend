import React, { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'

function EducationItem({ navigateTOEdit }) {
    const [activeWork, setActiveWork] = useState(true)
    return (
        <div className="work_item">
            <div className="left">
                <label className="switch">
                    <input type="checkbox" onClick={() => setActiveWork(!activeWork)} defaultChecked={activeWork} />
                    <span className={`slider round ${activeWork ? "enable" : "disable"}`}></span>
                </label>
                <span className='span'>Studies at Rangpur City Institute of Technology___RCIT.</span>
            </div>
            <div className="right">
                <span onClick={() => navigateTOEdit()}><BsFillPencilFill /></span>
            </div>
        </div>
    )
}

export default EducationItem
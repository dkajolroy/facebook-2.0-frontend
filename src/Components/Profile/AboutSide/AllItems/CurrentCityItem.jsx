import React, { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

function CurrentCityItem({ navigateTOEdit }) {
    const [activeWork, setActiveWork] = useState(true)
    const { profile } = useSelector(x => x.user)
    return (
        <div className="work_item">
            <div className="left">
                <label className="switch">
                    <input type="checkbox" onClick={() => setActiveWork(!activeWork)} defaultChecked={activeWork} />
                    <span className={`slider round ${activeWork ? "enable" : "disable"}`}></span>
                </label>
                <span className='span'>Live in {profile.details.currentCity.name && profile.details.currentCity.name}.</span>
            </div>
            <div className="right">
                <span onClick={() => navigateTOEdit()}><BsFillPencilFill /></span>
            </div>
        </div>
    )
}

export default CurrentCityItem
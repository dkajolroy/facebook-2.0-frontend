import React from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import { GiWorld } from 'react-icons/gi'
import { useSelector } from 'react-redux'

function Website({ navigateTOEdit }) {
    const { profile } = useSelector(x => x.user)
    return (
        <div className="work_item">
            <div className="left">
                <span><GiWorld /></span>
                <span className='span'>{profile && profile.details.website && profile.details.website}</span>
            </div>
            <div className="right">
                <span onClick={() => navigateTOEdit()}><BsFillPencilFill /></span>
            </div>
        </div>
    )
}

export default Website
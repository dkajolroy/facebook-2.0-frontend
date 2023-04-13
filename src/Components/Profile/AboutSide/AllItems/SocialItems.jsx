import React from 'react'
import { BsFillPencilFill, BsInstagram } from 'react-icons/bs'

function SocialItems({ navigateTOEdit }) {
    return (
        <div className="work_item">
            <div className="left">
                <span><BsInstagram /></span>
                <span className='span'>Instagram</span>
            </div>
            <div className="right">
                <span onClick={() => navigateTOEdit()}><BsFillPencilFill /></span>
            </div>
        </div>
    )
}

export default SocialItems
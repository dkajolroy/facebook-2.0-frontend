import React from 'react'
import { FaLock, FaUserFriends } from 'react-icons/fa'
import { TiArrowSortedDown } from 'react-icons/ti'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { BiWorld } from 'react-icons/bi';

function PrivacyButton({ setPrivacySlide, privacy }) {
    return (
        <div onClick={() => setPrivacySlide(true)} className="button_groupe">
            {
                privacy == "public" ?
                    <>
                        <span><BiWorld /></span>
                        <span>Public</span>
                        <span><TiArrowSortedDown /></span>
                    </> :
                    privacy == "friends" ?
                        <>
                            <span><FaUserFriends /></span>
                            <span>Friends</span>
                            <span><TiArrowSortedDown /></span>
                        </> :
                        privacy == "private" ?
                            <>
                                <span><BsFillShieldLockFill /></span>
                                <span>Private</span>
                                <span><TiArrowSortedDown /></span>
                            </> :
                            <>
                                <span><FaLock /></span>
                                <span>Only Me</span>
                                <span><TiArrowSortedDown /></span>
                            </>
            }
        </div>
    )
}

export default PrivacyButton
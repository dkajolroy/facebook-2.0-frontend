import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { editBioActions } from '../../../Redux/Actions/UserAction'

function Bio({ setBio, bio }) {

    const { username } = useParams()
    //get bio 
    const dispatch = useDispatch()
    const { profile, loading, error } = useSelector(x => x.user)
    const { user } = useSelector(x => x.auth)


    const [bioError, setBioError] = useState(false)
    const [newBio, setNewBio] = useState('')
    useEffect(() => {
        setNewBio(profile.details && profile.details.bio.trim())
    }, [profile])
    const changeBio = (e) => {
        setNewBio(e.target.value.trim())
        setBioError(false)
    }
    const editBioSubmit = () => {
        if (newBio && newBio.length > 101) {
            setBioError(true)
            return
        } {
            dispatch(editBioActions({ bio: newBio }, username))
            setBio(false)
        }
    }
    const cancelBio = () => {
        setBio(false)
        setBioError(false)
    }

    return (
        <>
            {
                bio ?
                    <div className="edit_bio_box">
                        <textarea maxLength={101} onChange={(e) => changeBio(e)} defaultValue={profile.details && profile.details.bio}></textarea>
                        <p className={`max_length_bio ${bioError ? "text-danger" : ''}`}>Max character {newBio && newBio.length == 0 ? "0" : newBio.length} of 101</p>
                        <div className="action_edit_bio_cc">
                            <button onClick={() => cancelBio()} className="btn shadow-none">Cancel</button>
                            <button onClick={() => editBioSubmit()} className={`btn shadow-none ${profile.details && profile.details.bio != newBio ? "btn-primary" : "save_button_fvf"}`}>
                                Save
                            </button>
                        </div>
                    </div> :
                    <div className="set_bio_box">
                        <span>{profile.details && profile.details.bio}</span>
                        {
                            username == user.username ?
                                <button onClick={() => setBio(true)} className="btn shadow-none edit_button_cdf">{newBio == '' ? "Add bio" : "Edit bio"}</button>
                                : null
                        }
                    </div>
            }
        </>
    )
}

export default Bio
import React from 'react'
import './create_post.css'
import CreateModal from './CreateModal';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function CreatePost({ setModal, modal }) {

    // Get Redux Data
    const { user } = useSelector(x => x.auth)
    const navigate = useNavigate()
    return (
        <div className='create_post_components'>
            <div className="user_fill_with_input">
                <div className="images" onClick={() => navigate(`/profile/${user && user.username}`)}>
                    <img src={user && user.picture} alt="user" />
                </div>
                <div onClick={() => setModal(!modal)} className="input_fill_xx">
                    <span>What on your mind Kajol ?</span>
                </div>
            </div>
            <CreateModal modal={modal} setModal={setModal} />
            <hr />
            <div className="bottom_extension">
                <div className="item d-flex align-items-center">
                    <span></span>
                    <h6>Live Video</h6>
                </div>
                <div onClick={() => setModal(true)} className="item d-flex align-items-center">
                    <span></span>
                    <h6>Photo/Video</h6>
                </div>
                <div className="item d-flex align-items-center">
                    <span></span>
                    <h6>Felling/Activity</h6>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
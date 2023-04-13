import React from 'react'
import { BsPencil, BsPinAngle, BsTrash } from 'react-icons/bs'
import { VscSave } from 'react-icons/vsc'
import { FiDownload, FiLock } from 'react-icons/fi';
import { IoNotificationsOffOutline, IoResizeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux';

function Option({ viewToFullScreen, post, deletePost }) {

    const { user } = useSelector(x => x.auth)


    return (
        <div className='post_option_modal shadow-lg' >
            <div className="item_of_post_operation_xry">
                <div className="icon">
                    <span><BsPinAngle /></span>
                </div>
                <div className="title">
                    <h6>Pin post</h6>
                </div>
            </div>
            <div className="item_of_post_operation_xry">
                <div className="icon">
                    <span><VscSave /></span>
                </div>
                <div className="title">
                    <h6>Save post</h6>
                    <b>Add this to your saved items</b>
                </div>
            </div>
            <div className="divider"></div>
            {
                post.user.username === user.username ?
                    <div className="item_of_post_operation_xry">
                        <div className="icon">
                            <span><BsPencil /></span>
                        </div>
                        <div className="title">
                            <h6>Edit post</h6>
                        </div>
                    </div> : null
            }
            <div className="item_of_post_operation_xry">
                <div className="icon">
                    <span><FiDownload /></span>
                </div>
                <div className="title">
                    <h6>Download</h6>
                </div>
            </div>
            <div onClick={viewToFullScreen} className="item_of_post_operation_xry">
                <div className="icon">
                    <span><IoResizeOutline /></span>
                </div>
                <div className="title">
                    <h6>Enter to Full Screen</h6>
                </div>
            </div>
            <div className="item_of_post_operation_xry">
                <div className="icon">
                    <span><FiLock /></span>
                </div>
                <div className="title">
                    <h6>Edit Audience</h6>
                </div>
            </div>{
                post.user.username === user.username ?
                    <div onClick={deletePost} className="item_of_post_operation_xry">
                        <div className="icon">
                            <span><BsTrash /></span>
                        </div>
                        <div className="title">
                            <h6>Move to Trash</h6>
                        </div>
                    </div> : null
            }
            <div className="divider"></div>
            <div className="item_of_post_operation_xry">
                <div className="icon">
                    <span><IoNotificationsOffOutline /></span>
                </div>
                <div className="title">
                    <h6>Turn off notifications for the post</h6>
                </div>
            </div>

        </div>
    )
}

export default Option
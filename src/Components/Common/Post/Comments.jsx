import React, { useEffect } from 'react'
import { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GifModal from './GifModal';
import EmojiPicker from '../CreatePost/EmojiPicker/EmojiPicker';
import { commentsToPost } from '../../../Redux/Actions/PostActions';
import { useParams } from 'react-router-dom';

function Comments({ post, emojiPickerWithInput, setEmojiPickerWithInput }) {
    const { user } = useSelector(x => x.auth)
    const { value } = useSelector(x => x.theme)
    const [gifModal, setGifModal] = useState(false)

    const [image, setImage] = useState('')
    const [errorFile, setErrorFile] = useState('')
    const imageRef = useRef(null)
    const imageHandle = (data) => {
        const files = data[0]
        if (files.type != "image/jpg" &&
            files.type != "image/jpeg" &&
            files.type != "image/png") {
            const error = files.type.split('/')[1]
            setErrorFile(error)
        } else {
            const imageReader = new FileReader()
            imageReader.readAsDataURL(files)
            imageReader.onload = () => {
                setImage(imageReader.result);
            }
        }
    }




    // Set Emoji Picker 
    let textRef = useRef(null)
    const [cursorPosition, setCursorPosition] = useState() //Cursor position Text/Emoji
    const [text, setText] = useState('') //Text area post

    useEffect(() => {
        if (textRef.current) {
            textRef.current.selectionEnd = cursorPosition
        }
    }, [cursorPosition])
    const handleEmoji = (e, { emoji }) => {
        const ref = textRef.current;
        ref.focus()
        const start = text.substring(0, ref.selectionStart)
        const end = text.substring(ref.selectionStart)
        const newText = start + emoji + end
        setText(newText)
        setCursorPosition(start.length + emoji.length)
    }


    //Reset Error
    const resetError = () => {
        setErrorFile('')
        setImage('')
        imageRef.current.value = ''
    }

    // Submit Comments
    const dispatch = useDispatch()
    const [commentLoading, setCommentLoading] = useState(false)
    const submitComment = async (e) => {
        if (e.key == "Enter") {
            if (text.trim().length < 1 && !image) {
                return
            } else {
                const data = {
                    text,
                    image: image.charAt(0) == "d" ? image : "",
                    postId: post._id,
                    gif: image.charAt(0) == "h" ? image : ""
                }
                setCommentLoading(true)
                await dispatch(commentsToPost(data))
                setText('')
                setImage('')
                setCommentLoading(false)
            }
        } else {
            return
        }
    }

    return (
        <div className='comments_of_post_ed'>
            <div className="row_of_comments">
                <div className="users_of_comments me-1">
                    <img src={user && user.picture} alt="user" />
                </div>
                <div className="comment_box_">
                    <input value={text}
                        ref={textRef}
                        type="text"
                        onClick={() => setEmojiPickerWithInput(false)}
                        onChange={(e) => setText(e.target.value)}
                        onKeyUp={(e) => submitComment(e)}
                        placeholder='Write a comments....'
                    />
                    <div className={`add_media_in_comments ${value == "dark" ? "dark" : 'light'}`}>
                        <i onClick={() => imageRef.current.click()}>
                            <input
                                onChange={(e) => imageHandle(e.target.files)}
                                ref={imageRef}
                                type="file"
                                accept='image/png,image/jpg,image/jpeg'
                            />
                        </i>
                        <i onClick={() => setEmojiPickerWithInput(!emojiPickerWithInput)}></i>
                        <i onClick={() => setGifModal(true)}></i>
                        <i></i>
                    </div>
                    {

                        commentLoading ?
                            <div className="error_files_format_lkd">
                                <div className="h-100 loading_back_FF">
                                    <div className="h-100 d-flex align-items-center animate__animated animate__fadeInLeft">
                                        <div style={{ width: "15px", margin: "0 1px", height: "15px" }} className="spinner-grow text-secondary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div style={{ width: "15px", margin: "0 1px", height: "15px" }} className="spinner-grow text-secondary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div style={{ width: "15px", margin: "0 1px", height: "15px" }} className="spinner-grow text-secondary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div style={{ width: "15px", margin: "0 1px", height: "15px" }} className="spinner-grow text-secondary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                    }
                </div>
            </div>
            {
                errorFile ?
                    <div className="error_files_format_lkd">
                        <div className="h-100 back_out_cc">
                            <div className="error_main animate__animated animate__fadeInLeft">
                                <span>{`${errorFile} not supported !!`}</span>
                                <button onClick={() => resetError()} className="btn shadow-none btn-primary">Try agin</button>
                            </div>
                        </div>
                    </div> :
                    image ?
                        <div className="images_items_of_comments">
                            <div className="ddd animate__animated animate__fadeInLeft">
                                <img src={image} alt="image" />
                                <span onClick={() => resetError()}><CgClose /></span>
                            </div>
                        </div> : null
            }

            {
                emojiPickerWithInput &&
                <div className={`emoji_picker_template_with_textarea`}>
                    <EmojiPicker handleEmoji={handleEmoji} />
                </div>
            }
            {
                gifModal &&
                <GifModal setGif={setImage} setGifModal={setGifModal} gifModal={gifModal} />
            }


        </div>
    )
}

export default Comments
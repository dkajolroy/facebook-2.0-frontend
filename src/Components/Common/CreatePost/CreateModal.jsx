import React, { useState } from 'react'
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io'
import { BsEmojiSmile } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import { useRef } from 'react';
import { useEffect } from 'react';
import Scrollbars from 'rc-scrollbars';
import AddImageVideo from './AddImageVideo/AddImageVideo';
import { Link } from 'react-router-dom';
import Privacy from './Privacy/PrivacySlide';
import PrivacyButton from './Privacy/PrivacyButton';
import FellingSlide from './FellingSlide/FellingSlide';
import TagSlide from './TagFriend/TagSlide';
import More from './More';
import { allFriendsAction } from '../../../Redux/Actions/UserAction';
import Background from './Background/Background';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import EditImageVideo from './AddImageVideo/EditImageVideo';
import axios from 'axios';
import { API_URI } from '../../../config';
import ErrorSlide from './ErrorSlide/ErrorSlide';
import BackgroundSlide from './Background/BackgroundSlide';


function CreateModal({ setModal, modal }) {
    // Responsive Media Query
    const isMdScreen = useMediaQuery({ query: '(max-width: 768px)' })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allFriendsAction())
    }, [])
    // Get Redux Data
    const { user } = useSelector(x => x.auth)
    const { value } = useSelector(x => x.theme)






    //Slide to set Other value
    const [more, setMore] = useState(false)
    const [privacySlide, setPrivacySlide] = useState(false)
    const [tagSlide, setTagSlide] = useState(false)
    const [fellingSlide, setFellingSlide] = useState(false)
    const [backgroundSlide, setBackgroundSlide] = useState(false)
    const [backgroundModal, setBackgroundModal] = useState(false)
    const [editImageVideo, setEditImageVideo] = useState(false)
    // Add Image/Video option props data
    const imageRef = useRef(null)
    const [imageVideoOption, setImageVideoOption] = useState(false)
    const [background, setBackground] = useState('')
    //Slide data inside
    const [privacy, setPrivacy] = useState('public')
    const [felling, setFelling] = useState('')
    const [tag, setTag] = useState([])
    const handleImageVide = () => {
        setImageVideoOption(!imageVideoOption)
        setBackground('')
    }




    const [base64, setBase64] = useState([])
    const [blobImage, setBlobImage] = useState([])
    const [unsupported, setUnsupported] = useState(false)
    const selectFiles = async (e) => {
        // Set Blob URL Image
        let files = [...e.target.files]
        const errorFile = files.filter(x =>
            x.type != "image/png" && x.type != "image/jpg" && x.type != "image/jpeg"
        )
        if (errorFile.length > 0) {
            setUnsupported(true)
        }
        const imageFile = files.filter(x => x.type == "image/png" || x.type == "image/jpg" || x.type == "image/jpeg")
        const arrayBlob = imageFile.map((x) => {
            return URL.createObjectURL(x)
        })
        const newBlob = [...blobImage, ...arrayBlob]
        setBlobImage(newBlob);

        // Set Array Base64
        files.forEach(item => {
            const reader = new FileReader()
            reader.onload = () => {
                setBase64(prev => [...prev, reader.result])
            }
            reader.readAsDataURL(item)
        })
    }



    // Close Post Modal
    const closePostModal = () => {
        setModal(false)
        setPrivacySlide(false)
        setTagSlide(false)
        setFellingSlide(false)
        setMore(false)
        setUnsupported(false)
    }
    // Set Emoji Picker 
    let textRef = useRef(null)
    const [cursorPosition, setCursorPosition] = useState() //Cursor position Text/Emoji
    const [emojiPicker, setEmojiPicker] = useState(false) //Modal
    const [emojiPickerWithTextarea, setEmojiPickerWithTextarea] = useState(false) //Modal
    const [text, setText] = useState('') //Text area post
    // Handle TextArea click 
    const emojiPickerHandle = () => {
        setEmojiPicker(false)
        setEmojiPickerWithTextarea(false)
    }
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
    // textAreaValue
    const [textLine, setTextLine] = useState(0)
    const textAreaValue = (e) => {
        let textLine = e.split("\n")
        setText(e)
        setTextLine(textLine.length)
    }






    //Submit Post Button
    const [uploadLoading, setUploadLoading] = useState(false)
    const submitPost = async () => {
        const getTagFriendID = tag.map(x => { return x._id })
        if (text.trim().length < 1 && blobImage.length < 1) {
            return
        } else {
            if (background && textLine < 4 && text.length < 131) {
                const dataObject = {
                    text,
                    privacy,
                    felling: felling,
                    tag: getTagFriendID,
                    background: background.image,
                    color: background.color
                }
                const newPost1 = () => async (dispatch, state) => {
                    setUploadLoading(true)
                    const { auth: { user } } = state()
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${user.token}`
                        }
                    }
                    await axios.post(`${API_URI}/create_post`, dataObject, config);
                    const myPost = await axios.post(`${API_URI}/my_post`, { username: user.username }, config)
                    dispatch({ type: "G_MY_POST_SUC", payload: myPost.data })
                    const { data } = await axios.get(`${API_URI}/follower_post`, config)
                    dispatch({ type: "GET_FNG_POST_SUC", payload: data })
                    const ddd = await axios.post(`${API_URI}/get_photo`, { max: 15, folder: '' }, config)
                    dispatch({ type: "GET_ALL_PHOTOS_SUC", payload: ddd.data })
                    setUploadLoading(false)
                    setBase64([])
                    setBlobImage([])
                    setFelling('')
                    setTag([])
                    setText('')
                    setBackground('')
                    setModal(false)
                    setPrivacySlide(false)
                    setTagSlide(false)
                    setFellingSlide(false)
                    setMore(false)
                    setUnsupported(false)
                }
                dispatch(newPost1())

            } else {
                const dataObject2 = {
                    text,
                    privacy,
                    felling: felling,
                    tag: getTagFriendID,
                    images: base64,
                }
                const newPost = () => async (dispatch, state) => {
                    setUploadLoading(true)
                    const { auth: { user } } = state()
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${user.token}`
                        }
                    }
                    await axios.post(`${API_URI}/create_post`, dataObject2, config);
                    const { data } = await axios.get(`${API_URI}/follower_post`, config)
                    dispatch({ type: "GET_FNG_POST_SUC", payload: data })
                    const myPost = await axios.post(`${API_URI}/my_post`, { username: user.username }, config)
                    dispatch({ type: "G_MY_POST_SUC", payload: myPost.data })
                    const ddd = await axios.post(`${API_URI}/get_photo`, { max: 15, folder: '' }, config)
                    dispatch({ type: "GET_ALL_PHOTOS_SUC", payload: ddd.data })
                    setUploadLoading(false)
                    setBase64([])
                    setBlobImage([])
                    setFelling('')
                    setTag([])
                    setText('')
                    setBackground('')
                    setModal(false)
                }
                dispatch(newPost())
            }
        }
    }



    return (
        <Modal
            isOpen={modal}
            contentLabel="SignUp Modal"
            ariaHideApp={false}
            className={`create_post_modal_open ${value}`}
            onRequestClose={() => closePostModal()}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    display: "flex",
                    alignItems: "center",
                    zIndex: "300",
                    top: `${isMdScreen ? "90px" : "0"}`,
                    justifyContent: "center",
                    background: `${value == "dark" ? "rgb(10 10 10 / 68%)" : "var(--bg-transparent1)"}`,
                },
                content: {
                    border: "none",
                    transition: ".2s",
                    zIndex: "200",
                    height: `${more ? "250px" : privacySlide ? "450px" : imageVideoOption ? "500px" : background ? "500px" : "460px"}`,
                    padding: '0'
                }
            }}
        >
            {
                more ?
                    <More setBackground={setBackground} setFellingSlide={setFellingSlide} setTagSlide={setTagSlide} setImageVideoOption={setImageVideoOption} setMore={setMore} /> :
                    unsupported ?
                        <ErrorSlide unsupported={unsupported} setUnsupported={setUnsupported} /> :
                        privacySlide ?
                            <Privacy setPrivacy={setPrivacy} privacy={privacy} setPrivacySlide={setPrivacySlide} /> :
                            fellingSlide ?
                                <FellingSlide felling={felling} setFelling={setFelling} setFellingSlide={setFellingSlide} /> :
                                tagSlide ?
                                    <TagSlide tag={tag} setTag={setTag} setTagSlide={setTagSlide} /> :
                                    editImageVideo ?
                                        <EditImageVideo setBase64={setBase64} blobImage={blobImage} setBlobImage={setBlobImage} setEditImageVideo={setEditImageVideo} editImageVideo={editImageVideo} /> :
                                        backgroundModal ?
                                            <BackgroundSlide setBackground={setBackground} setBackgroundModal={setBackgroundModal} /> :
                                            <>

                                                {/* Post Head */}
                                                <div className="create_post_component_ui  " onMouseLeave={() => setEmojiPicker(false)}>

                                                    <div className="heading_create_post" >
                                                        <h5>Create Post</h5>
                                                        <div onClick={(prev) => setModal(!prev)} className="cancel_post">
                                                            <IoMdClose />
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    {/* Post User */}
                                                    <div className="user_and_access_xx" >
                                                        <div className="image">
                                                            <img src={user && user.picture} alt="user" />
                                                        </div>
                                                        <div className="user_name_and_access">
                                                            <h6>
                                                                {user && user.first_name + " " + user.last_name}
                                                                {
                                                                    felling &&
                                                                    <span>
                                                                        is
                                                                        <i><i className={felling.icon}></i></i>
                                                                        feeling {`${felling.title}${tag.length < 1 ? `.` : ""}`}
                                                                    </span>
                                                                }
                                                                {
                                                                    tag.length == 1 ?
                                                                        <span>
                                                                            with <Link to="/">{`${tag[0].first_name + " " + tag[0].last_name}`}.</Link>
                                                                        </span> :
                                                                        tag.length == 2 ?
                                                                            <span>
                                                                                with
                                                                                <Link to="/">{` ${tag[0].first_name + " " + tag[0].last_name}`}</Link> and
                                                                                <Link to="/">{` ${tag[1].first_name + " " + tag[1].last_name}`}.</Link>
                                                                            </span> :
                                                                            tag.length == 3 ?
                                                                                <span>
                                                                                    with
                                                                                    <Link to="/">{` ${tag[0].first_name + " " + tag[0].last_name}`}</Link>,
                                                                                    <Link to="/">{` ${tag[1].first_name + " " + tag[1].last_name}`}.</Link> and
                                                                                    <Link to="/">{` ${tag[2].first_name + " " + tag[2].last_name}`}.</Link>
                                                                                </span> :
                                                                                tag.length > 3 ?
                                                                                    <span>
                                                                                        with
                                                                                        <Link to="/">{` ${tag[0].first_name + " " + tag[0].last_name}`}</Link>,
                                                                                        <Link to="/">{` ${tag[1].first_name + " " + tag[1].last_name}`}</Link>,
                                                                                        <Link to="/">{` ${tag[2].first_name + " " + tag[2].last_name} `}</Link>
                                                                                        {`and ${tag.length - 3} Other.`}
                                                                                    </span> :
                                                                                    null
                                                                }
                                                            </h6>
                                                            <PrivacyButton privacy={privacy} setPrivacySlide={setPrivacySlide} />
                                                        </div>
                                                    </div>
                                                    {/* Post Body */}
                                                    <div className={`${background ? "body_of_post_create_new_post" : "background_body_create_new_post"}`}>
                                                        {
                                                            emojiPickerWithTextarea &&
                                                            <div className={`emoji_picker_template_with_textarea`}>
                                                                <EmojiPicker handleEmoji={handleEmoji} />
                                                            </div>
                                                        }


                                                        <Scrollbars autoHide style={{ width: "100%", height: `${imageVideoOption ? "250px" : "100%"}` }}>


                                                            <div className={`text_editor_create ${background && textLine < 4 && text.length < 131 ? "background_enable h-100" : ""} ${background && textLine < 4 && text.length < 131 && background.color == "black" ? "black" : ""} ${textLine > 3 ? "max_hight" : ""} ${imageVideoOption ? "min_hide" : ""}`}>
                                                                <textarea
                                                                    wrap="physical"
                                                                    style={background && textLine < 4 && text.length < 131 ? { background: `url(${background.image})` } : null}
                                                                    onClick={() => emojiPickerHandle()}
                                                                    ref={textRef} value={text}
                                                                    onChange={(e) => textAreaValue(e.target.value)}
                                                                    className='shadow-none  form-control'
                                                                    placeholder={`What's on your mind ${user && user.first_name} ?`}
                                                                    cols="30" rows="5">
                                                                </textarea>

                                                                {
                                                                    imageVideoOption && <div className="right_button_add_emojis">
                                                                        <button onClick={() => setEmojiPickerWithTextarea(!emojiPickerWithTextarea)} className="btn shadow-none p-0">
                                                                            <span>
                                                                                <BsEmojiSmile />
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                }
                                                            </div>
                                                            {
                                                                imageVideoOption &&
                                                                <AddImageVideo setBase64={setBase64} setEditImageVideo={setEditImageVideo} blobImage={blobImage} setBlobImage={setBlobImage} selectFiles={selectFiles} imageRef={imageRef} setImageVideoOption={setImageVideoOption} />
                                                            }

                                                        </Scrollbars>
                                                        {/* Post Background And Emoji Picker*/}
                                                        {
                                                            imageVideoOption ? " " :
                                                                <div className={`post_back_position_new ${background ? "back" : "no"}`}>
                                                                    <div className="post_background_style ">
                                                                        <div className="left_button_add_background">
                                                                            <button onClick={() => setBackgroundSlide(!backgroundSlide)} className="btn shadow-none">
                                                                                {
                                                                                    backgroundSlide ?
                                                                                        <span className='animate__animated animate__fadeInRight'><MdOutlineArrowBackIos /></span> :
                                                                                        <img className='animate__animated animate__fadeIn' src="../../../../icons/colorful.png" alt="style" />
                                                                                }
                                                                            </button>
                                                                            {
                                                                                backgroundSlide &&
                                                                                <Background setBackgroundModal={setBackgroundModal} setBackgroundSlide={setBackgroundSlide} setBackground={setBackground} />
                                                                            }
                                                                        </div>
                                                                        <div className="right_button_add_emoji">
                                                                            <button onClick={() => setEmojiPicker(!emojiPicker)} className="btn shadow-none p-0">
                                                                                <span>
                                                                                    <BsEmojiSmile />
                                                                                </span>
                                                                            </button>
                                                                            {
                                                                                emojiPicker &&
                                                                                <div className={`emoji_picker_template`}>
                                                                                    <EmojiPicker handleEmoji={handleEmoji} />
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                    {/* Post Bottom */}
                                                    <div className="bottom_area_action_and_style">

                                                        {/* Add Image, tag, felling, location */}
                                                        <div className="bottom" >
                                                            <div className="add_other_in_your_post">
                                                                <button onClick={() => setMore(true)} className="button w-100 p-0 btn shadow-none">
                                                                    Add to your post
                                                                </button>
                                                                <div className="button_groupe_create_ui_x">
                                                                    <div onClick={() => handleImageVide()} className="item-of-new_g photo_and_video"><i></i></div>
                                                                    <div onClick={() => setTagSlide(true)} className="item-of-new_g tag_friends"><i></i></div>
                                                                    <div onClick={() => setFellingSlide(!fellingSlide)} className="item-of-new_g add_filling"><i></i></div>
                                                                    <div className="item-of-new_g add_locations"><i></i></div>
                                                                    <div className="item-of-new_g add_speck"><i></i></div>
                                                                    <div onClick={() => setMore(true)} className="item-of-new_g all_other"><i></i></div>
                                                                </div>
                                                            </div>
                                                            {/* Post Action button */}
                                                            <div className="action_create_post_xx">
                                                                <button onClick={submitPost} className={`${text.trim().length < 1 && blobImage.length < 1 ? " pointer_ss_bdk" : "btn-primary"} w-100 btn py-1 shadow-none`}>
                                                                    {uploadLoading ?
                                                                        <div>
                                                                            <div style={{ width: "15px", height: "15px", margin: "0 1px" }} className="spinner-grow text-light" role="status">
                                                                                <span className="visually-hidden">Loading...</span>
                                                                            </div>
                                                                            <div style={{ width: "15px", height: "15px", margin: "0 1px" }} className="spinner-grow text-light" role="status">
                                                                                <span className="visually-hidden">Loading...</span>
                                                                            </div>
                                                                            <div style={{ width: "15px", height: "15px", margin: "0 1px" }} className="spinner-grow text-light" role="status">
                                                                                <span className="visually-hidden">Loading...</span>
                                                                            </div>
                                                                            <div style={{ width: "15px", height: "15px", margin: "0 1px" }} className="spinner-grow text-light" role="status">
                                                                                <span className="visually-hidden">Loading...</span>
                                                                            </div>
                                                                            <div style={{ width: "15px", height: "15px", margin: "0 1px" }} className="spinner-grow text-light" role="status">
                                                                                <span className="visually-hidden">Loading...</span>
                                                                            </div>
                                                                        </div> : "Post"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>}

        </Modal >
    )
}

export default CreateModal
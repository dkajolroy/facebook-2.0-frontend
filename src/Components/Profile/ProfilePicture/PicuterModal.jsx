import Scrollbars from 'rc-scrollbars';
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import '../profile.css'
import { GiWoodFrame } from 'react-icons/gi'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import ErrorModal from './ErrorModal';
import PictureResizeTo from './PictureResizeTo';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { getAllPhotos } from '../../../Redux/Actions/UserAction';
import ItemLoading from '../../Common/Loading/ItemLoading';

function PictureModal({ setPictureModal, pictureModal }) {
    const { value } = useSelector(x => x.theme)

    const dispatch = useDispatch()
    useEffect(() => {
        const info = { max: 15, folder: "" }
        dispatch(getAllPhotos(info))
    }, [dispatch])
    const { photos, loading } = useSelector(x => x.allPhotos)
    const profilePic = photos.filter(x => x.folder.split("/").pop() == "profile_picture")
    const coverPic = photos.filter(x => x.folder.split("/").pop() == "cover_picture")


    const [resizeModal, setResizeModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)
    const inputRef = useRef(null)
    const handlePicture = (e) => {
        let files = e.target.files[0]

        if (
            files.type !== "image/jpg" &&
            files.type !== "image/png" &&
            files.type !== "image/jpeg"
        ) {
            setError(files.name.split(".").pop() + " Format Not Supported !!")
            setErrorModal(true)
            return
        } else if (
            files.size > 1000 * 1000 * 5
        ) {
            setError("File size too large !!")
            setErrorModal(true)
            return
        }
        else {
            setResizeModal(true)
            let reader = new FileReader()
            reader.readAsDataURL(files)
            reader.onload = (e) => {
                setImage(e.target.result)
            }
        }
    }


    // Select Image from
    const selectImageTo = async (url) => {
        let blob = await fetch(url).then(b => b.blob())
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = async (e) => {
            let profile = e.target.result
            setResizeModal(true)
            setImage(profile)
        }
    }

    return (
        <Modal
            isOpen={pictureModal}
            contentLabel="Edit Picture"
            ariaHideApp={false}
            className={`profile_picture_edit_modal animate__animated animate__fadeIn ${value}`}
            onRequestClose={() => setPictureModal(false)}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    top: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: `${value == "dark" ? "rgb(10 10 10 / 68%)" : "var(--bg-transparent1)"}`,
                    zIndex: 50003
                },
                content: {
                    top: '0',
                    left: "0",
                    border: "none",
                    zIndex: "1000",
                    padding: '20px'
                }
            }}
        >
            <ErrorModal inputRef={inputRef} error={error} setError={setError} errorModal={errorModal} setErrorModal={setErrorModal} />
            <PictureResizeTo setPictureModal={setPictureModal} inputRef={inputRef} image={image} setImage={setImage} setResizeModal={setResizeModal} resizeModal={resizeModal} />


            <div className="heading_picture_modal_com">
                <h5>Update Profile Picture</h5>
                <span onClick={() => setPictureModal(false)}><IoMdClose /></span>
                <hr />
            </div>
            <div className="action_update_process_c">
                <button onClick={() => inputRef.current.click()} className='btn shadow-none '>
                    <input type="file" accept="image/png, image/jpeg, image/jpg" ref={inputRef} hidden onChange={handlePicture} />
                    <span><AiOutlinePlus /></span> Update Photo
                </button>
                <button className='btn shadow-none '><span><GiWoodFrame /></span> Add Frame</button>
                <button className='btn shadow-none '><span><BsFillPencilFill /></span></button>
            </div>
            <Scrollbars style={{ width: "100%", height: "100%" }}>
                <div className="all_photos_items_xxd">
                    <div className="suggested_section_xx">
                        <h6>Recent Profile Picture</h6>
                        <div className="row gx-0 item_all_gp">
                            {loading ?
                                <>
                                    <ItemLoading />
                                    <ItemLoading />
                                    <ItemLoading />
                                    <ItemLoading />
                                </> :
                                profilePic.slice(0, 8).map((x, i) => (
                                    <div className="col-3 gx-1" key={i}>
                                        <div onClick={() => selectImageTo(x.secure_url)} className="modal_image_item"  >
                                            <img src={x.secure_url} alt="image" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="suggested_section_xx">
                        <h6>Cover Photos</h6>
                        <div className="row gx-0 item_all_gp">
                            {loading ?
                                <>
                                    <ItemLoading />
                                    <ItemLoading />
                                    <ItemLoading />
                                    <ItemLoading />
                                </> :
                                coverPic.slice(0, 8).map((x, i) => (
                                    <div className="col-3 gx-1" key={i}>
                                        <div onClick={() => selectImageTo(x.secure_url)} className="modal_image_item"  >
                                            <img src={x.secure_url} alt="image" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="suggested_section_xx">
                        <h6>Suggest Photos</h6>
                        <div className="row gx-0 item_all_gp">
                            {
                                photos.slice(0, 8).map((x, i) => (
                                    <div className="col-3 gx-1" key={i}>
                                        <div onClick={() => selectImageTo(x.secure_url)} className="modal_image_item"  >
                                            <img src={x.secure_url} alt="image" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Scrollbars>
        </Modal>
    )
}

export default PictureModal
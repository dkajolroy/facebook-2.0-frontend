import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CgClose } from 'react-icons/cg'
import Modal from 'react-modal'
import { Toaster } from 'react-hot-toast'
import Cropper from 'react-easy-crop'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { BiCrop } from 'react-icons/bi'
import { BsAlarmFill } from 'react-icons/bs'
import { MdPublic } from 'react-icons/md'
import Scrollbars from 'rc-scrollbars'
import { addProfilePicture } from '../../../Redux/Actions/UserAction';
import Loading from './LoadingModal';
import getCroppedImg from '../../../Helpers/imageCrop';
import { useParams } from 'react-router-dom';

function PictureResizeTo({ setImage, image, inputRef, resizeModal, setPictureModal, setResizeModal }) {

    const { value } = useSelector(x => x.theme)
    const [loadingModal, setLoadingModal] = useState(false)
    const [desc, setDesc] = useState('')


    const handleClose = () => {
        setResizeModal(false)
        inputRef.current.value = ""
    }
    const dispatch = useDispatch()



    // Image Cropper 
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedPixel, setCroppedPixel] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedPixel(croppedAreaPixels)
    }, [])

    const slide = useRef(null)
    const plushZoom = () => {
        slide.current.stepUp()
        setZoom(slide.current.value)
    }
    const minusZoom = () => {
        slide.current.stepDown()
        setZoom(slide.current.value)
    }


    const cropPicture = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedPixel
            )
            setImage(croppedImage)
            setZoom(1)
            setCrop({ x: 0, y: 0 })
        } catch (e) {
            console.error(e)
        }
    }, [croppedPixel])


    const saveProfilePicturex = async () => {
        const croppedImage = await getCroppedImg(
            image,
            croppedPixel
        )
        let blob = await fetch(croppedImage).then(b => b.blob())
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = async (e) => {
            let profile = e.target.result
            setLoadingModal(true)
            await dispatch(addProfilePicture({ image: profile, text: desc }))
            setLoadingModal(false)
            handleClose()
            setPictureModal(false)
        }
    }


    return (
        <Modal
            isOpen={resizeModal}
            contentLabel="Edit Picture"
            ariaHideApp={false}
            className={`profile_picture_resize_x ${value}`}
            onRequestClose={() => handleClose()}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    overflow: "hidden",
                    top: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: `${value == "dark" ? "rgb(10 10 10 / 68%)" : "var(--bg-transparent1)"}`,
                    zIndex: 50005
                },
                content: {
                    top: '0',
                    left: "0",
                    border: "none",
                }
            }}
        >

            <div className="picture_resize_to_save animate__animated  animate__fadeIn">
                <Toaster />

                {
                    loadingModal && <Loading modal={loadingModal} />
                }
                <div className="heading_top_x_bars">
                    <h5>Update Profile Picture</h5>
                    <span onClick={() => handleClose()}><CgClose /></span>
                    <hr />
                </div>
                <Scrollbars style={{ width: "100%", height: "490px" }} >
                    <div className="bottom_area_of_picture_resize">
                        <div className="post_description_picture">
                            <textarea defaultValue={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Description'></textarea>
                        </div>
                        <div className="images_view_and_cropper">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                cropShape={'round'}
                                aspect={4 / 4}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                objectFit="vertical-cover"
                            />
                        </div>
                        <div className="action_center_cropper_images">
                            <div className="range_zoom_in_out">
                                <span onClick={minusZoom}><FaMinus /></span>
                                <input ref={slide} type="range" min={1} max={3} step="0.1" onChange={(e) => setZoom(e.target.value)} value={zoom} />
                                <span onClick={plushZoom}><FaPlus /></span>
                            </div>
                            <div className="button_action_crop_images">
                                <button onClick={cropPicture} className="btn shadow-none"><span><BiCrop /></span> Crop Photo</button>
                                <button className="btn shadow-none"><span><BsAlarmFill /></span> Make Temporary</button>
                            </div>

                            <div className="footer_crop_image">
                                <div><span><MdPublic /></span> <span>Your Picture is a Public</span></div>
                                <div className="button_action_group_picture">
                                    <button onClick={() => handleClose(false)} className="btn shadow-none px-3 py-1">Cancel</button>
                                    <button onClick={saveProfilePicturex} className="btn shadow-none btn-primary px-3 py-1">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </Modal >
    )
}

export default PictureResizeTo
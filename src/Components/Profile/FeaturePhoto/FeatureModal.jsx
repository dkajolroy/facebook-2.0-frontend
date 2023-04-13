import Scrollbars from 'rc-scrollbars';
import React from 'react'
import { CgClose } from 'react-icons/cg';
import Modal from 'react-modal';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import './feature.css'
import { useState } from 'react';
import { addFeatureAction } from '../../../Redux/Actions/UserAction';

function FeatureModal({ featurePhotoModal, setFeaturePhotoModal }) {
    const { value } = useSelector(x => x.theme)


    const [uploadError, setUploadError] = useState('')
    const [image1, seTImage1] = useState('')
    const [image2, seTImage2] = useState('')
    const [image3, seTImage3] = useState('')
    const [image4, seTImage4] = useState('')
    const [image5, seTImage5] = useState('')
    const [image6, seTImage6] = useState('')
    const [image7, seTImage7] = useState('')
    const [image8, seTImage8] = useState('')
    const [image9, seTImage9] = useState('')
    // Feature 1 
    const feature1Input1 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage1(image)
            }
        }
    }

    // Feature 2
    const feature1Input2 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage2(image)
            }
        }
    }
    // Feature 3
    const feature1Input3 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage3(image)
            }
        }
    }
    // Feature 3
    const feature1Input4 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage4(image)
            }
        }
    }
    // Feature 3
    const feature1Input5 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage5(image)
            }
        }
    }
    // Feature 3
    const feature1Input6 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage6(image)
            }
        }
    }
    // Feature 3
    const feature1Input7 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage7(image)
            }
        }
    }
    // Feature 3
    const feature1Input8 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage8(image)
            }
        }
    }
    // Feature 3
    const feature1Input9 = (file) => {
        if (file.type !== 'image/png' && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            const error = file.type.split("/").pop()
            setUploadError(error)
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const image = reader.result
                seTImage9(image)
            }
        }
    }



    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const submitFeature = async () => {
        let arrayAll = []
        if (image1.trim()) { arrayAll = [...arrayAll, image1] }
        if (image2.trim()) { arrayAll = [...arrayAll, image2] }
        if (image3.trim()) { arrayAll = [...arrayAll, image3] }
        if (image4.trim()) { arrayAll = [...arrayAll, image4] }
        if (image5.trim()) { arrayAll = [...arrayAll, image5] }
        if (image6.trim()) { arrayAll = [...arrayAll, image6] }
        if (image7.trim()) { arrayAll = [...arrayAll, image7] }
        if (image8.trim()) { arrayAll = [...arrayAll, image8] }
        if (image9.trim()) { arrayAll = [...arrayAll, image9] }

        setLoading(true)
        await dispatch(addFeatureAction(arrayAll))
        setLoading(false)
        setFeaturePhotoModal(false)
    }





    return (
        <Modal
            isOpen={featurePhotoModal}
            contentLabel="Edit Picture"
            ariaHideApp={false}
            className={`profile_edit_details_modal animate__animated animate__fadeIn ${value}`}
            onRequestClose={() => setFeaturePhotoModal(false)}
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
                    padding: '0 10px'
                }
            }}
        >{
                uploadError ?
                    <div className="error_modal_of_features_mein">
                        <div className="error_items_file_ee animate__animated animate__fadeInLeft">
                            <span>{`${uploadError} is not supported !`}</span>
                            <button onClick={() => setUploadError('')} className="btn shadow-none btn-primary">Try agin</button>
                        </div>
                    </div> :
                    <div className="all_photos_items_cover">
                        <div className="heading_top_x_bars">
                            <h5>Edit Feature Photo</h5>
                            <span onClick={() => setFeaturePhotoModal(false)}><CgClose /></span>
                        </div>
                        <hr />

                        <Scrollbars style={{ width: "100%", height: "370px" }}>
                            <div className="all_feature_items">
                                <ul>
                                    <li>
                                        <label htmlFor="fff">
                                            <div className="feature_items">
                                                {
                                                    image1 ?
                                                        <img src={image1} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input1(e.target.files[0])} type="file" id='fff' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="fff2">
                                            <div className="feature_items">
                                                {
                                                    image2 ?
                                                        <img src={image2} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input2(e.target.files[0])} type="file" id='fff2' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="fff3">
                                            <div className="feature_items">
                                                {
                                                    image3 ?
                                                        <img src={image3} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input3(e.target.files[0])} type="file" id='fff3' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="fff4">
                                            <div className="feature_items">
                                                {
                                                    image4 ?
                                                        <img src={image4} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input4(e.target.files[0])} type="file" id='fff4' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="fff5">
                                            <div className="feature_items">
                                                {
                                                    image5 ?
                                                        <img src={image5} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input5(e.target.files[0])} type="file" id='fff5' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="fff6">
                                            <div className="feature_items">
                                                {
                                                    image6 ?
                                                        <img src={image6} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input6(e.target.files[0])} type="file" id='fff6' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="fff6">
                                            <div className="feature_items">
                                                {
                                                    image7 ?
                                                        <img src={image7} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input7(e.target.files[0])} type="file" id='fff6' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="fff6">
                                            <div className="feature_items">
                                                {
                                                    image8 ?
                                                        <img src={image8} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input8(e.target.files[0])} type="file" id='fff6' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="fff6">
                                            <div className="feature_items">
                                                {
                                                    image9 ?
                                                        <img src={image9} alt="feature" /> :
                                                        <div className="upload_files">
                                                            <i><AiOutlineCloudUpload /></i>
                                                            <span>Add Photo</span>
                                                        </div>
                                                }
                                                <input onChange={(e) => feature1Input9(e.target.files[0])} type="file" id='fff6' hidden accept='image/jpg,image/png,image/jpeg' />
                                            </div>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </Scrollbars>

                        <div className="bottom_save_all_items_action">
                            <button onClick={() => setFeaturePhotoModal(false)} className="btn py-1 me-2  btn-secondary shadow-none">Cancel</button>
                            <button onClick={() => submitFeature()} className="btn py-1 px-4 btn-primary shadow-none">
                                {loading ?
                                    <>
                                        <div className="spinner-grow spinner-grow-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div><div className="spinner-grow spinner-grow-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div><div className="spinner-grow spinner-grow-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </> : "Save"
                                }
                            </button>
                        </div>
                    </div>
            }

        </Modal>
    )
}

export default FeatureModal
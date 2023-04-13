import Scrollbars from 'rc-scrollbars';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhotos } from '../../../Redux/Actions/UserAction';
import ItemLoading from '../../Common/Loading/ItemLoading';

function SelectCoverModal({ coverSelectModal, setCover, setCoverSelectModal }) {

    const { value } = useSelector(x => x.theme)

    // Selection tab state
    const [tab, setTab] = useState(true)


    const dispatch = useDispatch()
    useEffect(() => {
        const info = { max: 15, folder: "" }
        dispatch(getAllPhotos(info))
    }, [dispatch])
    const { photos, loading } = useSelector(x => x.allPhotos)
    const coverPic = photos.filter(x => x.folder.split("/").pop() == "cover_picture")


    // Select Image from
    const selectImageTo = async (url) => {
        let blob = await fetch(url).then(b => b.blob())
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = async (e) => {
            let profile = e.target.result
            setCover(profile)
            setCoverSelectModal(false)
        }
    }

    return (
        <Modal
            isOpen={coverSelectModal}
            contentLabel="Edit Picture"
            ariaHideApp={false}
            className={`profile_picture_edit_modal animate__animated animate__fadeIn ${value}`}
            onRequestClose={() => setCoverSelectModal(false)}
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
            <div className="all_photos_items_cover">
                <div className="recent_photo_heading">
                    <h5>Suggested Photos</h5>
                </div>
                <hr />
                <Scrollbars style={{ width: "auto", height: "480px" }}>
                    <div className="selection_tab_recent">
                        <button onClick={() => setTab(true)} className={`btn shadow-none ${tab ? "active" : null}`}>Recent Photos</button>
                        <button onClick={() => setTab(false)} className={`btn shadow-none ${tab ? null : "active"}`}>Photo Albums</button>
                    </div>

                    {
                        tab ?
                            <div className="all_photos_cover_selection">
                                <div className="all_photos_items_xxd">
                                    <div className="suggested_section_xx">
                                        <h6>Recent Cover Photos</h6>
                                        <div className="row gx-0 item_all_gp">

                                            {
                                                loading ?
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
                                                loading ?
                                                    <>
                                                        <ItemLoading />
                                                        <ItemLoading />
                                                        <ItemLoading />
                                                        <ItemLoading />
                                                    </> :
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
                            </div> :
                            <div className="albums_to_cover_selection">
                                All Albums Cover
                            </div>
                    }

                </Scrollbars>
            </div>
        </Modal>
    )
}

export default SelectCoverModal
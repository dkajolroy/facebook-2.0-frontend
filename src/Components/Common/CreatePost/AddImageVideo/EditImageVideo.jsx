import Scrollbars from 'rc-scrollbars'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { BsFillPencilFill } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'

function EditImageVideo({ blobImage, setBase64, setBlobImage, setEditImageVideo }) {

    const removeItem = async (item) => {
        const filterBlob = blobImage.filter(x => x != item)
        setBlobImage(filterBlob);
        filterBlob.forEach(async item => {
            let blob = await fetch(item).then(b => b.blob())
            const reader = new FileReader()
            reader.onload = () => {
                setBase64(reader.result);
            }
            reader.readAsDataURL(blob)
        })
    }

    return (
        <div className='edit_image_video_of_create_post'>
            <div className="animate__animated animate__fadeInBottomRight">
                <div className="heading_privacy">
                    <h3>Edit Image/Video</h3>
                    <span onClick={() => setEditImageVideo(false)}> <BiArrowBack /></span>
                </div>
                <div className="divider"></div>
                <Scrollbars style={{ width: "100%", height: "432px" }}>
                    <div className="edit_image_new_all">
                        {
                            blobImage.map((x, i) => (
                                <div key={i} className="item_of_edit_image_new animate__animated animate__fadeInUp">
                                    <div className="edit_button__add">
                                        <button className="btn shadow-none">
                                            <span><BsFillPencilFill /></span>
                                            Edit
                                        </button>
                                    </div>
                                    <div className="remove_button_action">
                                        <span onClick={() => removeItem(x)}><CgClose /></span>
                                    </div>
                                    <img src={x} alt="editPic" />
                                </div>
                            ))
                        }
                    </div>
                </Scrollbars>
            </div>
        </div>
    )
}

export default EditImageVideo
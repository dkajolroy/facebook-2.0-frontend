import React from 'react'
import { BsFillPencilFill, BsPhone } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { MdAddToPhotos } from 'react-icons/md'

function AddImageVideo({ setBase64, setEditImageVideo, setImageVideoOption, selectFiles, blobImage, setBlobImage, imageRef }) {

    const closeIcon = () => {
        setImageVideoOption(false)
        setBlobImage([])
        setBase64([])
    }


    return (
        <div className="add_photo_and_video_com">
            <div className="close_icon">
                <i onClick={() => closeIcon()}><CgClose /></i>
            </div>
            {
                blobImage.length > 0 ?
                    <div className="post_image_grid_new">
                        <div className="add_or_edit_operation">
                            <button onClick={() => setEditImageVideo(true)} className="btn me-2 shadow-none">
                                <span><BsFillPencilFill /></span>
                                Edit
                            </button>
                            <button className="btn  shadow-none">
                                <label htmlFor="input_file">
                                    <span><MdAddToPhotos /></span>
                                    Add Image/Video
                                    <input type="file" id="input_file" multiple hidden onChange={(e) => selectFiles(e)} accept='image/jpg,image/png,image/jpeg' />
                                </label>
                            </button>
                        </div>
                        {
                            blobImage.slice(0, 5).map((x, i) => (
                                <div
                                    className={`image_grid_item ${blobImage.length == 1 ? "one" :
                                        blobImage.length == 2 ? "two" :
                                            blobImage.length == 3 ? "three" :
                                                blobImage.length == 4 ? "four" :
                                                    blobImage.length == 5 ? "five" :
                                                        "multi"
                                        }`}
                                    key={i} >
                                    <div className="item_of_post_image">
                                        <img src={x} alt="post" />
                                    </div>
                                </div>
                            ))
                        }
                        {
                            blobImage.length > 5 &&
                            <div className="image_grid_item multi" >
                                <div className="item_of_post_image">
                                    <span>{`+${blobImage.length - 4}`}</span>
                                </div>
                            </div>
                        }
                    </div> :
                    <div onClick={() => imageRef.current.click()} className="inside_add_media">
                        {
                            <div className="enter_add_drag">
                                <i><MdAddToPhotos /></i>
                                <p>Add Photo/Video</p>
                                <span>or drag and drop</span>
                                <input onChange={(e) => selectFiles(e)} ref={imageRef} multiple type="file" hidden accept='image/jpg,image/png,image/jpeg' />
                            </div>
                        }
                    </div>
            }

            <div className="bottom_side_next">
                <div className="left">
                    <i><BsPhone /></i>
                    <span>Add photos and videos from your mobile device.</span>
                </div>
                <button className='btn shadow-none'>Add</button>
            </div>
        </div>
    )
}

export default AddImageVideo
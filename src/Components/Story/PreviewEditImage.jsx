import React from 'react'

function PreviewEditImage({ image, loading }) {



    return (
        <div className='preview_image_to_edit_upload'>
            <div className="preview_area_out_of_story">
                <h6>Preview</h6>
                <div className="preview_area_of_story">
                    <div className="story_item_box_of_edit_image">
                        <img src={image} alt="image" />
                        {
                            loading &&
                            <div className="loading_upload_story">
                                <div className="spinner-border text-light" style={{ width: "4rem", height: "4rem" }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                    <span>Select photo to crop and rotate</span>
                </div>
            </div>
        </div>
    )
}

export default PreviewEditImage
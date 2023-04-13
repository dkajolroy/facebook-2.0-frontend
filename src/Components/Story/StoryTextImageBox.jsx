import React from 'react'
import { BiBody } from 'react-icons/bi'
import { MdPhotoLibrary } from 'react-icons/md'
import ErrorSlide from './ErrorSlide'

function StoryTextImageBox({ fileError, setFileError, inputFile }) {
    return (
        <div className="body_area_of_story">
            <div className={`${fileError ? "" : "hover_disable_of_story"} item_of_story_create_box`}>
                {
                    fileError ?
                        <ErrorSlide setFileError={setFileError} /> :
                        <label htmlFor="input">
                            <i><MdPhotoLibrary /></i>
                            <span>Create a photo Story</span>
                            <input onChange={(e) => inputFile(e.target.files)} accept="image/png,image/jpg,image/jpeg" type="file" id="input" hidden />
                        </label>
                }
            </div>
            <div className="item_of_story_create_box">
                <i><BiBody /></i>
                <span>Create a Text Story</span>
            </div>
        </div>
    )
}

export default StoryTextImageBox
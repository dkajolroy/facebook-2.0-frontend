import React from 'react'
import { useState } from 'react'
import PreviewEditImage from '../../Components/Story/PreviewEditImage'
import SideBar from '../../Components/Story/SideBar'
import StoryTextImageBox from '../../Components/Story/StoryTextImageBox'
import './story.css'

function Story() {

    const [image, setImage] = useState('')
    const [fileError, setFileError] = useState(false)
    const [loading, setLoading] = useState(false)
    const inputFile = (files) => {
        const file = files[0]
        if (
            file.type !== "image/jpg" &&
            file.type !== "image/png" &&
            file.type !== "image/jpeg"
        ) {
            setFileError(true)
        } else {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImage(e.target.result)
            }
        }
    }



    return (
        <div className='main_story_page_ui'>
            <div className="container-fluid gx-0">
                <div className="row gx-0">
                    {/* Side Bars */}
                    <div className="col-md-3">
                        <SideBar image={image} setLoading={setLoading} setImage={setImage} />
                    </div>
                    {/* Body Of Story */}
                    <div className="col-md-9">
                        {
                            image ?
                                <PreviewEditImage loading={loading} image={image} /> :
                                <StoryTextImageBox setFileError={setFileError} fileError={fileError} inputFile={inputFile} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Story
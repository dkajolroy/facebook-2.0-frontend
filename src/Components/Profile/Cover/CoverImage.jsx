import React, { useCallback } from 'react'
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { useDispatch } from 'react-redux'
import getCroppedImg from '../../../Helpers/imageCrop'
import { BiWorld } from 'react-icons/bi';
import { editCoverAction } from '../../../Redux/Actions/UserAction'

function CoverImage({ profile, cover, setLoadingModal, inputRef, setCover }) {


    // Image Cropper 
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedPixel, setCroppedPixel] = useState(null)
    const dispatch = useDispatch()

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedPixel(croppedAreaPixels)
    }, [])

    const saveCoverPicture = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                cover,
                croppedPixel
            )
            let blob = await fetch(croppedImage).then(b => b.blob())
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = async (e) => {
                let profile = e.target.result
                setLoadingModal(true)
                await dispatch(editCoverAction({ cover: profile }))
                setLoadingModal(false)
                cancel()
            }
        } catch (e) {
            console.error(e)
        }
    }, [croppedPixel])
    const cancel = () => {
        setCover(null)
        inputRef.current.value = ""
    }


    return (
        <>{
            cover ?
                <div className='position_action_group' >
                    <Cropper
                        image={cover}
                        crop={crop}
                        zoom={zoom}
                        aspect={500 / 145}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        objectFit="auto-cover"
                        showGrid={false}

                    />
                    <div className="action_cropper_cover_gfv animate__animated animate__fadeInDown ">
                        <div className="public_cover_text_ins">
                            <span><BiWorld /> </span>
                            <span>Your cover photo is public.</span>
                        </div>
                        <div className="action_cover_cdc">
                            <button onClick={() => cancel()} className='px-4 btn mx-1 shadow-none btn-secondary' >Cancel</button>
                            <button className='px-4 btn mx-1 shadow-none btn-primary' onClick={saveCoverPicture}>Submit</button>
                        </div>
                    </div>
                </div>
                :
                <img src={profile.cover && profile.cover} alt="cover" />
        }
        </>
    )
}

export default CoverImage
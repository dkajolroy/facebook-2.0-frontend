import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { viewPhotoAction } from '../../../Redux/Actions/PostActions'
import ItemLoading from '../../Common/Loading/ItemLoading'

function FeaturePhoto({ setFeaturePhotoModal }) {

    const { username } = useParams()
    const { user } = useSelector(x => x.auth)
    const { profile, loading } = useSelector(x => x.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const openImage = () => {
        dispatch(viewPhotoAction(profile.featureImage && profile.featureImage.slice(0, 9)))
        navigate('/view_image')
    }
    return (
        <>
            <div className="all_items_cd_feature">
                {
                    loading ?
                        <>
                            <ItemLoading />
                            <ItemLoading />
                            <ItemLoading />
                            <ItemLoading />
                            <ItemLoading />
                            <ItemLoading />
                        </> :
                        profile.featureImage && profile.featureImage.slice(0, 9).map((x, i) => (
                            <div onClick={() => openImage()} className='feature_image_live' key={i}>
                                <div className="image_items_of_features_ll">
                                    <img src={x} alt="feature" />
                                </div>
                            </div>
                        ))
                }
            </div>
            {
                username == user.username ?
                    <button onClick={() => setFeaturePhotoModal(true)} className="button btn shadow-none w-100">Edit Feature</button>
                    : null
            }
        </>
    )
}

export default FeaturePhoto
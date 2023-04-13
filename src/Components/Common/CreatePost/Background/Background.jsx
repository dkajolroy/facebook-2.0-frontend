import React from 'react'
import { IoGrid } from 'react-icons/io5';
import backgroundData from '../../../../Helpers/postBackground';

function Background({ setBackground, setBackgroundModal, setBackgroundSlide }) {

    const handleBackground = (obj) => {
        setBackground(obj)
    }
    const removeBack = () => {
        setBackgroundSlide(false)
        setBackground('')
    }
    return (
        <div className='new_post_background_add'>
            <div onClick={() => removeBack()} className="background_of_new_image animate__animated animate__fadeInRight" >
                <span></span>
            </div>
            {
                backgroundData.slice(0, 8).map((x, i) => (
                    <div onClick={() => handleBackground({ image: x.background, color: x.color })} className="background_of_new_image animate__animated animate__fadeInRight" key={i}>
                        <img src={x.background} alt="back" />
                    </div>
                ))
            }
            <div className="background_of_new_image animate__animated animate__fadeInRight" >
                <span onClick={() => setBackgroundModal(true)}><IoGrid /></span>
            </div>
        </div>
    )
}

export default Background
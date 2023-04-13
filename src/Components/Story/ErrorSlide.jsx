import React from 'react'

function ErrorSlide({ setFileError }) {
    return (
        <div className='error_slide_of_story '>
            <div className="animate__animated animate__fadeInLeft">
                <div className="error_box_fr">
                    <span>This file not supported !</span>
                    <button onClick={() => setFileError(false)} className="btn px-2 py-1 btn-primary shadow-none">
                        Try agin
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorSlide
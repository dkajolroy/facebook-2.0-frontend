import React from 'react'
import './error.css'

function ErrorSlide({ setUnsupported }) {
    return (
        <div className='unsupported_error_file_upload '>
            <div className="error_message_show animate__animated animate__fadeInLeft">
                <span>This file not supported !!</span>
                <button onClick={() => setUnsupported(false)} className="btn shadow-none btn-primary">Try agin</button>
            </div>
        </div>
    )
}

export default ErrorSlide
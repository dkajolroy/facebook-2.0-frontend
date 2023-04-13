import React from 'react'

function Loading() {



    return (

        <div className="loading_modal_profile_update animate__animated animate__fadeInLeft">
            <div className="d-flex loading_group">
                <div className="spinner-grow text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>

            </div>
        </div>
    )
}

export default Loading
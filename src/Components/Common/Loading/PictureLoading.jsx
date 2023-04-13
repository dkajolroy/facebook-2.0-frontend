import React from 'react'
import './loading.css'

function PictureLoading() {
    return (
        <div className="loading_box" style={{ height: "170px", width: "170px", borderRadius: "50%", border: "5px solid #fff" }}>
            <div className="card loading" style={{ height: "100%", width: "100%", borderRadius: "50%" }}>
                <div className="image" style={{ height: "220px", width: "100%" }}>
                </div>
            </div>
        </div>
    )
}

export default PictureLoading
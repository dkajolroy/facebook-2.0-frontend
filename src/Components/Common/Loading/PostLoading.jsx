import React from 'react'
import './loading.css'

function PostLoading() {
    return (
        <div className="loading_box">
            <div className="heading">
                <div style={{ width: "45px", height: "45px" }} className="circle"></div>
                <div style={{ width: "50%", height: "20px", marginTop: "5px" }}>
                    <div style={{ height: "15px", marginLeft: "10px" }} className="description"></div>
                    <div style={{ height: "15px", marginLeft: "10px" }} className="description"></div>
                </div>
            </div>
            <div className="card loading p-2">
                <div className="image" style={{ height: "200px" }}>
                </div>
                <div className="content">
                    <div style={{ height: "10px" }} className="description"></div>
                    <div style={{ height: "10px" }} className="description"></div>
                    <div style={{ height: "30px" }} className="description"></div>
                </div>
            </div>
        </div>
    )
}

export default PostLoading
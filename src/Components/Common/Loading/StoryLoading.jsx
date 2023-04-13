import React from 'react'

function StoryLoading() {
    return (
        <div className="loading_box mx-1">
            <div className="card loading p-1">
                <div className="image" style={{ height: "100px" }}>
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

export default StoryLoading
import React from 'react'

function ProfileNameLoading() {
    return (
        <div className="loading_boxx" >
            <div className="card loading" style={{ border: "none", height: "100%", width: "200px" }}>
                <div className="content">
                    <div style={{ height: "10px" }} className="description"></div>
                    <div style={{ height: "10px" }} className="description"></div>
                    <div style={{ height: "30px" }} className="description"></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileNameLoading
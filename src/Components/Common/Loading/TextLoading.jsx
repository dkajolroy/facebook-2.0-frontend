import React from 'react'

function TextLoading({ w }) {
    return (
        <div className="col-lg-2 col-md-3 col-sm-4 col-6 gx-1 gy-1 loading_boxx" style={{ height: "30px", width: w, }}>
            <div className="card loading" style={{ height: "100%", width: "100%" }}>
                <div className="image" style={{ height: "100%", width: "100%" }}>
                </div>
            </div>
        </div>
    )
}

export default TextLoading
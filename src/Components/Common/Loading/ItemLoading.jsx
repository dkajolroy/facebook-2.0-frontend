import React from 'react'

function ItemLoading() {
    return (
        <div className="col-lg-2 col-md-3 col-sm-4 col-6 gx-1 gy-1 loading_boxx" style={{ height: "120px", width: "120px", }}>
            <div className="card loading" style={{ height: "100%", width: "100%" }}>
                <div className="image" style={{ height: "220px", width: "100%" }}>
                </div>
            </div>
        </div>
    )
}

export default ItemLoading
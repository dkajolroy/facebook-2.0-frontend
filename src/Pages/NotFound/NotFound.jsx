import React from 'react'
import "./not_found.css"

function NotFound() {
    return (
        <div className='not_found_error'>
            <div className="error_message">
                <h2>404 Error</h2><hr />
                <h4>Page Not Found</h4>
            </div>
        </div>
    )
}

export default NotFound
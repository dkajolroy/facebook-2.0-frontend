import React from 'react'

function ErrorModal({ error, inputRef, setError, setErrorModal }) {

    const errorHandler = () => {
        setError(null)
        setErrorModal(false)
        inputRef.current.value = ''
    }

    return (

        <div className="error_input_picture_files animate__animated animate__fadeInLeft">
            <h5 style={{ textTransform: "capitalize" }}>{error && error}</h5>
            <button onClick={() => errorHandler()} className="btn btn-primary px-4">Try another</button>
        </div>
    )
}

export default ErrorModal
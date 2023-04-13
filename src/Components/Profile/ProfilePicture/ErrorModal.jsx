import React from 'react'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'

function ErrorModal({ error, inputRef, setError, errorModal, setErrorModal }) {
    const { value } = useSelector(x => x.theme)
    const errorHandler = () => {
        setError(null)
        setErrorModal(false)
        inputRef.current.value = ''
    }

    return (
        <Modal
            isOpen={errorModal}
            contentLabel="Edit Picture"
            ariaHideApp={false}
            className={`profile_picture_format_error ${value}`}
            onRequestClose={() => errorHandler()}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    overflow: "hidden",
                    top: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "transparent",
                    zIndex: 50004
                },
                content: {
                    top: '0',
                    left: "0",
                    border: "none",
                    zIndex: "1000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }
            }}
        >
            <div className="error_input_picture_files animate__animated animate__fadeInLeft">
                <h5 style={{ textTransform: "capitalize" }}>{error && error}</h5>
                <button onClick={() => errorHandler()} className="btn btn-primary px-4">Try another</button>
            </div>
        </Modal>
    )
}

export default ErrorModal
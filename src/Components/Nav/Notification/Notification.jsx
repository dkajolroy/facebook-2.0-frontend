import React from 'react'
import Modal from 'react-modal'
import './notification.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Notification({ setNotificationModal, notificationModal }) {

    // LogOut Function
    const navigate = useNavigate()

    const { value } = useSelector(x => x.theme)
    return (
        <Modal
            isOpen={notificationModal}
            contentLabel="SignUp Modal"
            ariaHideApp={false}
            className={`setting_modal_customize ${value}`}
            onRequestClose={() => setNotificationModal(false)}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    top: "53px",
                    display: "flex",
                    justifyContent: "end",
                    zIndex: "5003",
                    background: "transparent",
                },
                content: {
                    top: '0',
                    left: "0",
                    width: "360px",
                    height: "415px",
                    border: "none",
                    padding: '0'
                }
            }}
        >
            <div className="profile__setting_ui">
                <h2>Notification</h2>
            </div>
        </Modal>
    )
}

export default Notification
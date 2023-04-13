import React from 'react'
import Modal from 'react-modal'
import './accessibility.css'
import ThemeModal from './ThemeModal'
import Index from './Index'
import { useSelector } from 'react-redux'



function Accessibility({ setModal, modal, setThemeOpen, themeOpen }) {

    const { value } = useSelector(x => x.theme)

    return (
        <Modal
            isOpen={modal}
            contentLabel="SignUp Modal"
            ariaHideApp={false}
            className={`setting_modal_customize shadow-lg ${value}`}
            onRequestClose={() => setModal()}
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
                    width: "360px",
                    height: themeOpen ? '480px' : "415px",
                    left: "0",
                    border: "none",
                    overflow: "hidden",
                    padding: '0'
                }
            }}
        >
            <div className="profile__setting_ui">
                {
                    themeOpen ?
                        <ThemeModal themeOpen={themeOpen} setThemeOpen={setThemeOpen} /> :
                        <Index setThemeOpen={setThemeOpen} />
                }
            </div>
        </Modal>
    )
}

export default Accessibility
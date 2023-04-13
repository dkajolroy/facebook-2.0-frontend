import React from 'react'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import './message.css'

function Massage({ setModal, modal }) {

  const { value } = useSelector(x => x.theme)
  return (
    <Modal
      isOpen={modal}
      contentLabel="SignUp Modal"
      ariaHideApp={false}
      className={`setting_modal_customize ${value}`}
      onRequestClose={() => setModal(false)}
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
      <div className="message__setting_ui">
        <h2>Massage</h2>
      </div>
    </Modal>
  )
}

export default Massage
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './sidebar.css'

function Sidebars({ item }) {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/${item.text.toLowerCase()}`)} className="sidebar_items d-flex align-items-center animate__animated animate__fadeInDown">
            <div className="images_icons">
                <img src={`../../../left/${item.img}.png`} alt="user" />
            </div>
            <div className="title_sidebar">
                {item.text}
            </div>
        </div>
    )
}

export default Sidebars
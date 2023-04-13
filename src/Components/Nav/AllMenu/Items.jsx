import React from 'react'
import { useNavigate } from 'react-router-dom'

function Items({ items }) {
    const navigate = useNavigate()
    const { description, icon, name } = items
    return (
        <div className="all_menu_items" onClick={() => navigate(`/${icon}`)}>
            <div className="all_menu_icons">
                <img src={`../../../left/${icon}.png`} alt="menu icon" />
            </div>
            <div className="all_menu_details">
                <h6>{name}</h6>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Items
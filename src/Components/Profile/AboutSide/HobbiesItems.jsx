import React from 'react'


function hobbieItems({ item }) {
    return (
        <>
            <span>
                <i><i className={item.icon}></i></i>
                {item.title}
            </span>
        </>
    )
}

export default hobbieItems
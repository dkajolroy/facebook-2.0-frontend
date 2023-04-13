import React from 'react'
import { useState } from 'react'
import ContactInfo from './AllTab/ContactInfo'
import Family from './AllTab/Family'
import Overview from './AllTab/Overview'
import Place from './AllTab/Place'
import Work from './AllTab/Work'

function AboutMenu() {
    const [item, setItem] = useState("overview")
    return (
        <div className='row'>
            <div className="col-md-4 border_right">
                <div className="heading_vv">
                    <h4>About</h4>
                </div>
                <div className="action_item_about">
                    <button onClick={() => setItem("overview")} className={`btn shadow-none ${item == "overview" ? "active" : null}`}>Overview</button>
                    <button onClick={() => setItem("work")} className={`btn shadow-none ${item == "work" ? "active" : null}`}>Work and education</button>
                    <button onClick={() => setItem("place")} className={`btn shadow-none ${item == "place" ? "active" : null}`}>Place lived</button>
                    <button onClick={() => setItem("contact")} className={`btn shadow-none ${item == "contact" ? "active" : null}`}>Contact and basic info</button>
                    <button onClick={() => setItem("family")} className={`btn shadow-none ${item == "family" ? "active" : null}`}>Family and relationships</button>
                    <button onClick={() => setItem("about")} className={`btn shadow-none ${item == "about" ? "active" : null}`}>Details about you</button>
                    <button onClick={() => setItem("life")} className={`btn shadow-none ${item == "life" ? "active" : null}`}>Life events</button>
                </div>
            </div>
            <div className="col-md-8">
                {
                    item == "overview" ?
                        <Overview /> :
                        item == "work" ?
                            <Work /> :
                            item == "place" ?
                                <Place /> :
                                item == "contact" ?
                                    <ContactInfo /> :
                                    item == "family" ?
                                        <Family /> : null
                }
            </div>
        </div>
    )
}

export default AboutMenu
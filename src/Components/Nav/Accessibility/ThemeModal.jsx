import React from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { BsMoonFill } from 'react-icons/bs';
import { IoMdCompass } from 'react-icons/io';
import './accessibility.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { themeAction } from '../../../Redux/Actions/SignInActions';


function ThemeModal({ setThemeOpen }) {

    // set theme value
    const dispatch = useDispatch()
    const { value } = useSelector(x => x.theme)

    const changeTheme = (e) => {
        dispatch(themeAction(e))
    }


    const [compact, setCompact] = useState("off")

    return (
        <div className="theme_dark_light_compo animate__animated animate__fadeInRight">
            <div className="heading_theme_and_back">
                <span onClick={() => setThemeOpen(false)}><BiArrowBack /></span>
                <h4>Display & Accessibility</h4>
            </div>
            <div className="dark_mode_main_ss">
                <div className="heading_dark_sjf">
                    <div className="icon_span">
                        <span><BsMoonFill /></span>
                    </div>
                    <div className="right_title_paragraph">
                        <h6>Dark Mode</h6>
                        <p>Adjust the appearance of Facebook to reduce glare and give your eyes a break.</p>
                    </div>
                </div>
            </div>
            <div className="action_theme_groupe_s">
                <div className="item_theme">
                    <label htmlFor="off">
                        <span>Off</span>
                        <input onChange={(e) => changeTheme(e.target.value)} defaultChecked={value == "light" ? true : false} value="light" type="radio" name="theme" id='off' />
                    </label>
                </div>
                <div className="item_theme">
                    <label htmlFor="on">
                        <span>On</span>
                        <input onChange={(e) => changeTheme(e.target.value)} defaultChecked={value == "dark" ? true : false} value="dark" type="radio" name="theme" id="on" />
                    </label>
                </div>
            </div>
            <div className="dark_mode_main_ss">
                <div className="heading_dark_sjf">
                    <div className="icon_span">
                        <span><IoMdCompass /></span>
                    </div>
                    <div className="right_title_paragraph">
                        <h6>Compact Mode</h6>
                        <p>Make your font size smaller so more content can fit on the screen.</p>
                    </div>
                </div>
            </div>
            <div className="action_theme_groupe_s">
                <div className="item_theme">
                    <label htmlFor="off2">
                        <span>Off</span>
                        <input defaultChecked={compact == "off" ? true : false} onChange={(e) => setCompact(e.target.value)} value="off" type="radio" name="theme2" id='off2' />
                    </label>
                </div>
                <div className="item_theme">
                    <label htmlFor="on2">
                        <span>On</span>
                        <input defaultChecked={compact == "on" ? true : false} onChange={(e) => setCompact(e.target.value)} value="on" type="radio" name="theme2" id="on2" />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ThemeModal
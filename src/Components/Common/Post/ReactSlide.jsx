import React from 'react'
// Gif
import thumbG from "../../../Helpers/reacts/like.gif";
import loveG from "../../../Helpers/reacts/love.gif";
import careG from "../../../Helpers/reacts/care.gif";
import hahaG from "../../../Helpers/reacts/haha.gif";
import angryG from "../../../Helpers/reacts/angry.gif";
import sadG from "../../../Helpers/reacts/sad.gif";
import wowG from "../../../Helpers/reacts/wow.gif";

function ReactSlide({ reactAction }) {

    return (
        <>
            <div className="on_hover_react_groupe ">
                <ul>
                    <li className='animate__animated thumb animate__fadeInUp'>
                        <span><img onClick={() => reactAction("like")} src={thumbG} alt="react" /></span>
                    </li>
                    <li className='animate__animated love animate__fadeInUp'>
                        <span><img onClick={() => reactAction("love")} src={loveG} alt="react" /></span>
                    </li>
                    <li className='animate__animated care animate__fadeInUp'>
                        <span><img onClick={() => reactAction("care")} src={careG} alt="react" /></span>
                    </li>
                    <li className='animate__animated haha animate__fadeInUp'>
                        <span><img onClick={() => reactAction("haha")} src={hahaG} alt="react" /></span>
                    </li>
                    <li className='animate__animated sad animate__fadeInUp'>
                        <span><img onClick={() => reactAction("sad")} src={sadG} alt="react" /></span>
                    </li>
                    <li className='animate__animated wow animate__fadeInUp'>
                        <span><img onClick={() => reactAction("wow")} src={wowG} alt="react" /></span>
                    </li>
                    <li className='animate__animated angry animate__fadeInUp'>
                        <span><img onClick={() => reactAction("angry")} src={angryG} alt="react" /></span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ReactSlide
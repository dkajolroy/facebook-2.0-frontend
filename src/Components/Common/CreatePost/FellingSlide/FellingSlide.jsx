import Scrollbars from 'rc-scrollbars'
import React from 'react'
import { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { BsEyeglasses, BsFillCalendarDateFill, BsFillCloudLightningFill, BsSearch } from 'react-icons/bs'
import { GiWatch, GiTwoFeathers, GiCommercialAirplane, GiMagnifyingGlass } from 'react-icons/gi'
import { RiHeadphoneFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { IoGameController } from 'react-icons/io5'
import { MdCelebration } from 'react-icons/md'
import fellingData from '../../../../Helpers/fellingData'


function FellingSlide({ setFellingSlide, setFelling, felling }) {
    const [tabFell, setTabFell] = useState(true)
    const [newData, setNewData] = useState(fellingData)

    const handleFellingData = (data) => {
        if (felling.title == data.title) {
            setFelling('')
            setFellingSlide(false)
        } else {
            setFelling(data)
            setFellingSlide(false)
        }
    }
    const filteringData = (event) => {
        const text = event.target.value
        const filter = fellingData.filter(x => x.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
        setNewData(filter)
    }
    return (
        <div className='felling_slide_post_data'>
            <div className="animate__animated animate__fadeInRight">
                <div className="heading_privacy">
                    <h3>How are you feeling?</h3>
                    <span onClick={() => setFellingSlide(false)}> <BiArrowBack /></span>
                </div>
                <div className="divider"></div>
                <div className="desc_felling">
                    <button onClick={() => setTabFell(true)} className={`btn rounded-0 px-3 shadow-none ${tabFell ? "active" : null}`}>Felling</button>
                    <button onClick={() => setTabFell(false)} className={`btn rounded-0 px-3 shadow-none ${tabFell ? null : "active"}`}>Activities</button>
                </div>
                <div className="all_data_of_felling">
                    {
                        tabFell ?
                            <div className="all_fell_data_slide">
                                <div className="search__bar_nav_ui">
                                    <div className="d-flex align-items-center search_cndcndkcd">

                                        <div className="search_bar_groupe w-100">
                                            <input onChange={(e) => filteringData(e)} type="search" className="form-control shadow-none" placeholder='Search Facebook' />
                                            <span><BsSearch /></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_of_felling_data_row animate__animated animate__fadeInRight ">
                                    <Scrollbars style={{ width: "100%", height: "290px" }}>
                                        <div className="row gx-0">
                                            {
                                                newData && newData.map((x, i) => (
                                                    <div key={i} className="col-6">
                                                        <div onClick={() => handleFellingData({ title: x.title, icon: x.icon })} className="item_of_feeling">
                                                            <span> <i className={`${x && x.icon}`}></i></span>
                                                            <p>{x.title}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Scrollbars>
                                </div>
                            </div> :
                            <div className="all_activities_data_slide">
                                <div className="search__bar_nav_ui">
                                    <div className="d-flex align-items-center search_cndcndkcd">

                                        <div className="search_bar_groupe w-100">
                                            <input type="search" className="form-control shadow-none" placeholder='Search Facebook' />
                                            <span><BsSearch /></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="all_item_of_activities animate__animated animate__fadeInLeft">
                                    <Scrollbars style={{ width: "100%", height: "290px" }}>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><BsEyeglasses /></span>
                                                <p>Celebrating...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><MdCelebration /></span>
                                                <p>Watching...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><GiWatch /></span>
                                                <p>Eating...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><GiTwoFeathers /></span>
                                                <p>Drinking...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><BsFillCalendarDateFill /></span>
                                                <p>Attending...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><GiCommercialAirplane /></span>
                                                <p>Traveling to...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><RiHeadphoneFill /></span>
                                                <p>Listening...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><GiMagnifyingGlass /></span>
                                                <p>Reading...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><IoGameController /></span>
                                                <p>Playing...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                        <div className="item_of_activity">
                                            <div className="left_act">
                                                <span><BsFillCloudLightningFill /></span>
                                                <p>Thanking...</p>
                                            </div>
                                            <div className="right_act">
                                                <span><IoIosArrowForward /></span>
                                            </div>
                                        </div>
                                    </Scrollbars>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FellingSlide
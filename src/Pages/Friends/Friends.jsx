import React, { useEffect, useState } from 'react'
import Nav from '../../Components/Nav/Nav'
import { useMediaQuery } from 'react-responsive'
import './friends.css'
import SideBars from '../../Components/Friends/SideBars'
import FriendItem from '../../Components/Friends/FriendItem'
import RequestedFriend from '../../Components/Friends/RequestedFriend'
import { useDispatch, useSelector } from 'react-redux'
import { allFriendsAction, getAllUserAction, requested_friendAction } from '../../Redux/Actions/UserAction'
import { IoMdArrowDropdown } from 'react-icons/io'
import SuggestItem from '../../Components/Friends/SuggestItem'
import Scrollbars from 'rc-scrollbars'

function Friends() {

    // Responsive MediaQuery
    const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' })
    const [tab, setTab] = useState(1)

    //Get Data
    const dispatch = useDispatch()
    const allFriends = useSelector(x => x.allFriends)
    const requestedList = useSelector(x => x.requestedFriend)
    const allUser = useSelector(x => x.allUser)
    useEffect(() => {
        dispatch(allFriendsAction())
        dispatch(requested_friendAction())
        dispatch(getAllUserAction())
    }, [dispatch])

    // Home See More Request
    const [request, setRequest] = useState(8)

    return (
        <div className='friends_pages_ui'>
            <Nav />

            <div className="container-fluid gx-0">
                <div className="row gx-0">
                    <div className="col-md-3">
                        <SideBars tab={tab} setTab={setTab} />
                    </div>
                    <div className="col-md-9">
                        <div className="friends_layout_xx">

                            {/* Home Friend Request*/}
                            {tab === 1 ?
                                <>
                                    <Scrollbars autoHide style={{ width: "100%", height: "86vh" }}>
                                        <div className="total_item_fgd">
                                            <div className="suggest_menu">
                                                <h5>Friend Request</h5>
                                                <div className="row">
                                                    {
                                                        requestedList.request.slice(0, request).map((x, i) => (
                                                            <RequestedFriend key={i} friend={x} />
                                                        ))
                                                    }
                                                </div>
                                                {
                                                    requestedList.request.length < 1 ?
                                                        <span className='cd_dcd_xx'>Don't have any request !</span> :
                                                        <div className="see_more_request_xx_fd">
                                                            <button onClick={() => setRequest(request + 24)} className="btn w-100 shadow-none">
                                                                See More
                                                                <span><IoMdArrowDropdown /></span>
                                                            </button>
                                                        </div>
                                                }
                                                <hr />
                                                <h5>People You May Know</h5>
                                                <div className="row gx-3 gy-3">
                                                    {
                                                        allUser.user.map((x, i) => (
                                                            <SuggestItem key={i} friend={x} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Scrollbars>
                                </> :

                                tab === 2 ?
                                    <>
                                        <Scrollbars autoHide style={{ width: "100%", height: "86vh" }}>
                                            <div className="total_item_fgd">
                                                <div className="suggest_menu">
                                                    <h5>Friend Request</h5>
                                                    {
                                                        requestedList.request < 1 ?
                                                            <span className='cd_dcd_xx'>Don't have any request !</span> :
                                                            <div className="row gx-3 gy-3">

                                                                {
                                                                    requestedList.request.map((x, i) => (
                                                                        <RequestedFriend key={i} friend={x} />
                                                                    ))
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </Scrollbars>
                                    </> :
                                    tab === 3 ?
                                        <>
                                            <Scrollbars autoHide style={{ width: "100%", height: "86vh" }}>
                                                <div className="total_item_fgd">
                                                    <div className="suggest_menu">
                                                        <h5>Suggest Friends</h5>
                                                        {
                                                            allUser.user < 1 ?
                                                                <span className='cd_dcd_xx'>All suggested friends !</span> :
                                                                <div className="row gx-3 gy-3">
                                                                    {
                                                                        allUser.user.map((x, i) => (
                                                                            <SuggestItem key={i} friend={x} />
                                                                        ))
                                                                    }
                                                                </div>
                                                        }

                                                    </div>
                                                </div>
                                            </Scrollbars>
                                        </> :
                                        tab === 4 ?
                                            <Scrollbars autoHide style={{ width: "100%", height: "86vh" }}>
                                                <h5>All Friends</h5>
                                                <div className="row gx-3 gy-3">
                                                    {
                                                        allFriends.friendList.map((x, i) => (
                                                            <FriendItem key={i} friend={x} />
                                                        ))
                                                    }
                                                </div>
                                            </Scrollbars> :
                                            tab === 5 ?
                                                <h2>BirthDay </h2> :
                                                <h2>Custom List</h2>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends
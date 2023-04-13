import React, { useEffect, useState } from 'react'
import './post.css'
import { FaUserFriends } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Option from './Option'
import moment from 'moment';
import thumb from "../../../Helpers/reacts/zthumb.png";
import love from "../../../Helpers/reacts/zlove.png";
import haha from "../../../Helpers/reacts/zhaha.png";
import angry from "../../../Helpers/reacts/zangry.png";
import sad from "../../../Helpers/reacts/zsad.png";
import wow from "../../../Helpers/reacts/zwow.png";
import care from "../../../Helpers/reacts/zcare.png";
import axios from 'axios'
import { API_URI } from '../../../config'
import ReactSlide from './ReactSlide'
// Thumb
import { BiLike } from 'react-icons/bi';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom'
import { deletePostActon, viewPhotoAction } from '../../../Redux/Actions/PostActions'
import Comments from './Comments'
import { getAllFIdAction } from '../../../Redux/Actions/UserAction'

function Post({ post }) {

    const { profile } = useSelector(x => x.user)
    const { user } = useSelector(x => x.auth)
    const { userFriends } = useSelector(x => x.getFriendsID)

    const navigate = useNavigate()
    const navigateToProfile = (username) => {
        navigate(`/profile/${username}`)
        window.scrollTo(0, 0)
    }

    const [react, setReact] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllFIdAction())
        const reactGet = () => async (dispatch, state) => {
            const { auth: { user } } = state()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post(`${API_URI}/react`, { postId: post._id }, config)
            setReact(data)
        }
        dispatch(reactGet())
    }, [])
    const myFriend = react && react.filter(x => userFriends && userFriends.includes(x.reactBy._id))

    let total = []
    react.forEach(function (x) { total[x.reactType] = (total[x.reactType] || 0) + 1; });
    let idoLike = react && react.filter(x => x.reactBy._id == user._id)

    console.log(myFriend);


    // Get Redux Data
    const [option, setOption] = useState(false)
    const [reactGroup, setReactGroup] = useState(false)

    // Action React 
    const reactAction = (type) => {
        const actionReact = () => async (dispatch, state) => {
            const { auth: { user } } = state()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.token}`
                }
            }
            await axios.put(`${API_URI}/react`, { postId: post._id, reactType: type }, config)
            const { data } = await axios.post(`${API_URI}/react`, { postId: post._id }, config)
            setReact(data)
        }
        dispatch(actionReact())
        setReactGroup(false)
    }

    // Navigate to ViewPhoto
    const viewPhotoRe = (images) => {
        if (images.length > 0) {
            dispatch(viewPhotoAction(images));
            navigate("/view_image")
        } else {
            return
        }
    }

    const [emojiPickerWithInput, setEmojiPickerWithInput] = useState(false) //Modal
    const mouseLeave = () => {
        setOption(false)
        setEmojiPickerWithInput(false)
    }

    //Showing Me or My Friends Comments
    const myComments = post && post.comments.filter(x => x.commentedBy._id == user._id).pop()
    const allComment = post.comments.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })  //Without already showing my comments
    const [viewMore, setViewMore] = useState(0) //view more Post


    const viewCommentImage = () => {
        dispatch(viewPhotoAction([post]));
        navigate("/view_image")
    }

    // view TO Full screen
    const viewToFullScreen = () => {
        dispatch(viewPhotoAction(post.images));
        navigate("/view_image")
    }

    // Move TO Trash
    const deletePost = () => {
        dispatch(deletePostActon(post._id))
        setOption(false)
    }
    return (
        <div onMouseLeave={() => mouseLeave()} className='get_post_all_ui_xx'>
            <div className="post_headers_info">
                <div className="left_user_info_xxxx">
                    <div className="posted_user_image"
                        onClick={() => navigateToProfile(post.user.username)}
                    >
                        <img src={post.user && post.user.picture} alt="user" />
                    </div>
                    <div className="post_with_info_xx">
                        <div className="top_info">
                            <div className='user_info'>
                                <span className='user_name_self' onClick={() => navigateToProfile(post.user.username)}>{post.user && post.user.first_name + " " + post.user.last_name}</span>

                                {post && post.type === "profile" && <span>updated his profile picture.</span>}
                                {post && post.type === "cover" && <span>updated his cover photo.</span>}
                                {/* Post Felling You */}

                                {
                                    post && post.felling &&
                                    <span>
                                        is
                                        <i><i className={post.felling.icon}></i></i>
                                        feeling {`${post.felling.title}${post.tag.length < 1 ? `.` : ""}`}
                                    </span>
                                }
                                {/* Tag his friends and felling */}
                                {post && post.tag.length == 1 ?
                                    <span>
                                        with <Link to={`/user/${post.tag[0].username}`}>{`${post.tag[0].first_name + " " + post.tag[0].last_name}`}.</Link>
                                    </span> :
                                    post && post.tag.length == 2 ?
                                        <span>
                                            with
                                            <Link to={`/user/${post.tag[0].username}`}>{` ${post.tag[0].first_name + " " + post.tag[0].last_name}`}</Link> and
                                            <Link to={`/user/${post.tag[1].username}`}>{` ${post.tag[1].first_name + " " + post.tag[1].last_name}`}.</Link>
                                        </span> :
                                        post && post.tag.length == 3 ?
                                            <span>
                                                with
                                                <Link to={`/user/${post.tag[0].username}`}>{` ${post.tag[0].first_name + " " + post.tag[0].last_name}`}</Link>,
                                                <Link to={`/user/${post.tag[1].username}`}>{` ${post.tag[1].first_name + " " + post.tag[1].last_name}`}.</Link> and
                                                <Link to={`/user/${post.tag[2].username}`}>{` ${post.tag[2].first_name + " " + post.tag[2].last_name}`}.</Link>
                                            </span> :
                                            post && post.tag.length > 3 ?
                                                <span>
                                                    with
                                                    <Link to={`/user/${post.tag[0].username}`}>{` ${post.tag[0].first_name + " " + post.tag[0].last_name}`}</Link>,
                                                    <Link to={`/user/${post.tag[1].username}`}>{` ${post.tag[1].first_name + " " + post.tag[1].last_name}`}</Link>,
                                                    <Link to={`/user/${post.tag[2].username}`}>{` ${post.tag[2].first_name + " " + post.tag[2].last_name} `}</Link>
                                                    {`and ${post.tag.length - 3} other.`}
                                                </span> :
                                                null
                                }
                            </div>
                        </div>
                        <div className="bottom_info">
                            <span>{moment(post && post.createdAt).fromNow()}</span>
                            <span><FaUserFriends /></span>
                        </div>
                    </div>
                </div>
                <div className="post_actions_menus">
                    {option && <Option deletePost={deletePost} post={post} viewToFullScreen={viewToFullScreen} />}
                    <i onClick={() => setOption(!option)}></i>
                </div>
            </div>
            {/* Post Area  */}
            <div className="post_data_text_and_media">
                <div className="post_data_xx">

                    {
                        // Profile Image Post Design
                        post && post.type === "profile" ?
                            <>
                                <p>{post && post.text}</p>
                                <div className="user_post_cover_background">
                                    <div className="background_cover_post">
                                        <img src={profile && profile.cover} alt="cover" />
                                        <div onClick={() => viewPhotoRe(post.images)} className="my_new_profile_image">
                                            <img src={post && post.images[0]} alt="user" />
                                        </div>
                                    </div>
                                </div>
                            </> :
                            // Cover Post Design
                            post && post.type === "cover" ?
                                <div onClick={() => viewPhotoRe(post.images)} className="post_data_images">
                                    <img src={post && post.images[0]} alt="post" />
                                </div> :
                                // Background Image Post Design
                                post && post.background ?
                                    <div style={{
                                        background: `url(${post.background})`
                                    }} className={`main_post_bg_text_img ${post && post.color == "black" ? "white" : ""} `}>
                                        <div className="main_post_area_rgf">
                                            <p className="post_text_layer_back">
                                                {post && post.text}
                                            </p>
                                        </div>
                                    </div> :
                                    // Normal Post with images
                                    <div className="main_post_text_and_image">
                                        <div className="desc_of_post">
                                            <p>{post && post.text}</p>
                                        </div>
                                        <div onClick={() => viewPhotoRe(post.images)} className={`images_of_post_media ${post.images.length > 1 ? "max_height" : ""}`}>
                                            {
                                                post && post.images.slice(0, 5).map((x, i) => (
                                                    <div key={i}
                                                        className={`images_item_of_created_post 
                                                        ${post.images.length == 1 ? "one" :
                                                                post.images.length == 2 ? "two" :
                                                                    post.images.length == 3 ? "three" :
                                                                        post.images.length == 4 ? "four" :
                                                                            post.images.length == 5 ? "five" : "multi"
                                                            }`}>
                                                        <div className="item_create_xx ">
                                                            <img src={x} alt="image" />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            {
                                                post && post.images.length > 5 &&
                                                <div className="images_item_of_created_post">
                                                    <div className="item_cvf">
                                                        <span>{`+${post && post.images.length - 4}`}</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                    }
                </div>
            </div>

            {/* total React And Comment */}
            <div onMouseLeave={() => setReactGroup(false)} className="bottom_action_and_info">
                <div className="total_react_and_comment_x">
                    <div className="left_react_posts_xx">
                        <div className="react_and_comment_xgg">
                            <div className="react_icons_posts">


                                <ul>
                                    {total.like && < li > <img src={thumb} alt="react" /></li>}
                                    {total.love && <li><img src={love} alt="react" /></li>}
                                    {total.wow && <li><img src={wow} alt="react" /></li>}
                                    {total.care && <li><img src={care} alt="react" /></li>}
                                    {total.haha && <li><img src={haha} alt="react" /></li>}
                                    {total.sad && <li><img src={sad} alt="react" /></li>}
                                    {total.angry && <li><img src={angry} alt="react" /></li>}


                                </ul>

                            </div>
                            {
                                reactGroup &&
                                <ReactSlide reactAction={reactAction} />
                            }
                        </div>
                        {/* You , 0 */}
                        <div className="react_friend_connection_x">

                            {myFriend.length == 1 ?
                                <div className="friend_like">
                                    <span>{idoLike.length > 0 && "You and"} </span>
                                    {myFriend.slice(0, 1).map((x, i) => (
                                        <span key={i}>
                                            {`${x.reactBy.first_name + " " + x.reactBy.last_name}`}
                                        </span>
                                    ))}
                                </div> :

                                myFriend.length > 0 ?
                                    <div className="friend_like">
                                        <span>{idoLike.length > 0 && "You,"}</span>
                                        {myFriend.slice(0, 2).map((x, i) => (
                                            <span key={i}>
                                                {`${x.reactBy.first_name}`},
                                            </span>
                                        ))}
                                        <span>{`and ${react.length - 2 > 999 && react.length - 2 < 1000000 ? (react.length - 2 / 1000).toFixed(1) + 'K' : react.length - 2 > 1000000 ? (react.length - 2 / 1000000).toFixed(1) + 'M' : react.length - myFriend.slice(0, 2).length} other`} </span>
                                    </div> :
                                    react.length < 1 ? null :
                                        <div className="with_out_friends">
                                            <span>{idoLike.length > 0 && "You "}{`${react.length}`} </span>
                                        </div>
                            }
                        </div>
                    </div>
                    <div className="total_comment_posts">
                        <span onClick={() => setViewMore(viewMore + 3)}>{`${post && post.comments.length == 0 ? "" : post.comments.length + " Comments"}`}</span>
                    </div>
                </div>
                {/* Action Post  */}
                <div className="like_comment_and_share_xx">
                    <div onMouseEnter={() => setReactGroup(true)} className="item_action_post_vxg">

                        <button onClick={() => reactAction("like")} className="btn shadow-none">
                            <span>{idoLike[0] ?
                                idoLike[0].reactType == "wow" ?
                                    <img src={wow} alt="react" /> :
                                    idoLike[0].reactType == "love" ?
                                        <img src={love} alt="react" /> :
                                        idoLike[0].reactType == "haha" ?
                                            <img src={haha} alt="react" /> :
                                            idoLike[0].reactType == "angry" ?
                                                <img src={angry} alt="react" /> :
                                                idoLike[0].reactType == "sad" ?
                                                    <img src={sad} alt="react" /> :
                                                    idoLike[0].reactType == "care" ?
                                                        <img src={care} alt="react" /> :
                                                        idoLike[0].reactType == "like" ?
                                                            <img src={thumb} alt="react" /> :
                                                            <BiLike /> :
                                <BiLike />
                            }</span> Like
                        </button>
                    </div>
                    <div className="item_action_post_vxg">

                        <button onClick={() => setViewMore(viewMore + 3)} className="btn shadow-none">
                            <span><GoComment /></span> Comment
                        </button>
                    </div>
                    <div className="item_action_post_vxg">

                        <button className="btn shadow-none">
                            <span><RiShareForwardLine /></span> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Box */}
            <Comments post={post} setEmojiPickerWithInput={setEmojiPickerWithInput} emojiPickerWithInput={emojiPickerWithInput} />

            {/* Show Comments  My or  other */}
            {
                post.comments.length > 0 &&
                <div className="view_comments_all_to_more">
                    {
                        viewMore < 2 &&
                        myComments &&
                        <div className="item_of_comments_ss">
                            <div className="background_to">
                                <div className="user_of_comments_info">
                                    <div className="images_of_commented_user">
                                        <img src={myComments.commentedBy.picture} alt="user" />
                                    </div>
                                </div>

                                <div className="comments_of_post">
                                    <h6>
                                        {`${myComments.commentedBy.first_name} ${myComments.commentedBy.last_name}`}
                                    </h6>
                                    {<span>{myComments.comment}</span>}

                                    {
                                        myComments.image &&
                                        <div onClick={() => viewCommentImage()} className="images_of_post_comments">
                                            <img src={myComments.image} alt="image" />
                                        </div>
                                    }
                                    <div className="info_of_comments_">
                                        <div className="left_liked_in">
                                            <button className="btn shadow-none">Like</button>
                                            <button className="btn shadow-none">Reply</button>
                                        </div>
                                        <span>{moment(myComments && myComments.createdAt).fromNow()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        allComment.slice(0, viewMore).map((x, i) => (
                            <div className="item_of_comments_ss animate__animated animate__fadeInDown" key={i} >

                                <div className="background_to">
                                    <div className="user_of_comments_info">
                                        <div className="images_of_commented_user">
                                            <img src={x.commentedBy.picture} alt="user" />
                                        </div>
                                    </div>

                                    <div className="comments_of_post">
                                        <h6>
                                            {`${x.commentedBy.first_name} ${x.commentedBy.last_name}`}
                                        </h6>
                                        {<span>{x.comment}</span>}
                                        {
                                            x.image &&
                                            <div onClick={() => viewCommentImage(x.image)} className="images_of_post_comments">
                                                <img src={x.image} alt="image" />
                                            </div>
                                        }
                                        <div className="info_of_comments_">
                                            <div className="left_liked_in">
                                                <button className="btn shadow-none">Like</button>
                                                <button className="btn shadow-none">Reply</button>
                                            </div>
                                            <span>{moment(x.createdAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    {
                        allComment.length > viewMore ?
                            <button onClick={() => setViewMore(viewMore + 3)} className="animate__animated animate__fadeInUp btn py-0 shadow-none text-primary">View more comments</button>
                            : <button onClick={() => setViewMore(0)} className="btn py-0 animate__animated animate__fadeInUp shadow-none text-primary">Collapse all</button>
                    }
                </div>
            }

        </div >
    )
}

export default Post
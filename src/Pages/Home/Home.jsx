import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../../Components/Common/CreatePost/CreatePost';
import PostLoading from '../../Components/Common/Loading/PostLoading';
import StoryLoading from '../../Components/Common/Loading/StoryLoading';
import Post from '../../Components/Common/Post/Post';
import Sidebars from '../../Components/Home/Sidebar/Sidebars';
import Stories from '../../Components/Home/Stories/Stories';
import Widgets from '../../Components/Home/Widgets/Widgets';
import Nav from '../../Components/Nav/Nav';
import { getFollowingPostActions } from '../../Redux/Actions/PostActions';
import { getStoryAction } from '../../Redux/Actions/StoryActions';
import { getDetailsAction, requested_friendAction } from '../../Redux/Actions/UserAction';
import './home.css';


function Home() {

    const dispatch = useDispatch()
    const { user } = useSelector(x => x.auth)
    const postState = useSelector(x => x.allPosts)
    const { story, loading } = useSelector(x => x.getStory)
    useEffect(() => {
        dispatch(requested_friendAction())
        dispatch(getFollowingPostActions())
        dispatch(getDetailsAction())
        dispatch(getStoryAction())
    }, [dispatch])
    // Responsive Media Query
    const isMdScreen = useMediaQuery({ query: '(min-width: 992px)' })
    const navigate = useNavigate()

    const newArray = []
    for (var i of story) {
        if (newArray[i.user._id]) {
            newArray[i.user._id].push(i)
        } else {
            newArray[i.user._id] = [i]
        }
    }
    const [postModal, setPostModal] = useState(false)




    return (
        <div className='home_section'>
            <Nav setPostModal={setPostModal} />
            <div className="container-fluid home_ui_nav_area">
                <div className="row">
                    {
                        isMdScreen &&
                        <div className="col-md-3">
                            <div className="side_bars_main_xx_gb ">
                                <Sidebars />
                            </div>
                        </div>
                    }
                    <div className="col-lg-6 col-md-8 m-auto">

                        <div className="stories_xx_main_section">
                            {
                                loading ?
                                    <>
                                        <StoryLoading />
                                        <StoryLoading />
                                        <StoryLoading />
                                        <StoryLoading />
                                        <StoryLoading />
                                    </> :
                                    <>
                                        <div onClick={() => navigate("/story")} className="stories_items_xx">
                                            <div className="images_user">
                                                <img src={user && user.picture} alt="user" />
                                            </div>
                                            <div className="info_creator">
                                                <span><BsPlusLg /></span>
                                                <p>Create Story</p>
                                            </div>
                                        </div>


                                        {story.slice(0, 4).map((x, i) => (
                                            <Stories item={x} key={i} />
                                        ))}
                                    </>

                            }

                        </div>
                        <div className="create_post_section my-3">
                            <div className="col-lg-9 col-md-10 m-auto">
                                {
                                    postState.loading ?
                                        null :
                                        <CreatePost modal={postModal} setModal={setPostModal} />
                                }
                                {
                                    postState &&
                                        postState.loading ?
                                        <>
                                            <PostLoading />
                                            <PostLoading />
                                            <PostLoading />
                                        </> :
                                        postState.posts ?
                                            postState.posts.map((x, i) => (
                                                <Post post={x} key={i} />
                                            )) :
                                            postState.error ?
                                                <h3>Error...500</h3> :
                                                null
                                }
                            </div>
                        </div>

                    </div>
                    {
                        isMdScreen &&
                        <div className="col-md-3">
                            <Widgets />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
import React from 'react'
import { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Scrollbars from 'rc-scrollbars';
import { BsSearch } from 'react-icons/bs'
import TagFriendItems from './TagFriendItems'
import TagShowItem from './TagShowItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function TagSlide({ setTagSlide, setTag, tag }) {

    const { friendList, loading } = useSelector(x => x.allFriends)


    const [allFriends, setAllFriends] = useState([])
    useEffect(() => {
        const filterAll = friendList.filter((item) => !tag.includes(item))
        setAllFriends(filterAll)
    }, [tag, friendList])


    const addTag = (item) => {  //Set Tag 
        const already = tag.find(x => x._id == item._id)
        const removeUser = allFriends.filter(x => x._id != item._id)
        if (!already) {
            const newAdd = [...tag, item]
            setTag(newAdd)
            setAllFriends(removeUser)
        } else {
            setAllFriends(removeUser)
        }
    }


    const removedTag = (id) => {  //Remove Item
        const filter = tag.filter(x => x._id != id)
        setTag(filter)
    }

    const filterFriends = (name) => {  //Search to set
        const filter = friendList && friendList.filter(x => x.first_name.toLowerCase().includes(name.toLowerCase()))
        setAllFriends(filter)
    }


    return (
        <div className='tag_slide_post_data'>
            <div className="animate__animated animate__fadeInBottomRight">
                <div className="heading_privacy">
                    <h3>Tag people</h3>
                    <span onClick={() => setTagSlide(false)}> <BiArrowBack /></span>
                </div>
                <div className="divider"></div>
                <div className="search__bar_nav_ui">
                    <div className="d-flex align-items-center search_cndcndkcd">
                        <div className="search_bar_groupe w-100">
                            <input onChange={(e) => filterFriends(e.target.value)} type="search" className="form-control shadow-none" placeholder='Search Facebook' />
                            <span><BsSearch /></span>
                        </div>
                        <div className="action_done">
                            <button onClick={() => setTagSlide(false)} className="btn shadow-none">Done</button>
                        </div>
                    </div>
                </div>
                {
                    tag.length > 0 &&
                    <div className="add_box_friend_item">
                        {
                            tag.map((x, i) => (
                                <TagShowItem removedTag={removedTag} tagItem={x} key={i} />
                            ))
                        }
                    </div>
                }
                <div className="all_search_to_list">
                    <Scrollbars style={{ width: "100%", height: `${tag.length > 0 ? "285px" : "330px"}` }}>
                        <div className="title"><span>Search</span></div>
                        {loading ?
                            <h3>Loading...</h3> :
                            allFriends.map((x, i) => (
                                <TagFriendItems addTag={addTag} key={i} friend={x} />
                            ))
                        }
                    </Scrollbars>
                </div>
            </div>
        </div >
    )
}

export default TagSlide
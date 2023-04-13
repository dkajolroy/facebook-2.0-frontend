import React from 'react'
import { BiWorld } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { MdLocationOn, MdWork } from 'react-icons/md'
import { ImHome3 } from 'react-icons/im';
import { useSelector } from 'react-redux';
import WorkItem from './WorkItem';
import ItemLoading from '../../../Common/Loading/ItemLoading';
import TextLoading from '../../../Common/Loading/TextLoading';

function Overview() {
    // GEt Value 
    const { profile, loading } = useSelector(x => x.user)
    const { user } = useSelector(x => x.auth)
    return (
        <div className='overview_about_sec_gg'>
            <div className="heading_of_contact_info">
                <h6>Overview</h6>
            </div>
            {loading ?
                <>
                    <TextLoading w="80%" />
                    <TextLoading w="80%" />
                    <TextLoading w="80%" />
                </> :
                profile.work && profile.work.map((x, i) => (
                    <WorkItem x={x} key={i} />
                ))
            }
            {/* Live In */}
            <div className="work_item_about_ppp">
                {
                    loading ?
                        <>
                            <TextLoading w="50%" />
                        </> :
                        <div className="left_bar">
                            <i className='icon_ll'><ImHome3 /></i>
                            <div className="heading_work_menu_tt">
                                <h6 className="title_of_work">
                                    {`    Live in ${profile.details && profile.details.currentCity.name && profile.details.currentCity.name}`}
                                </h6>
                            </div>
                        </div>
                }
                {

                    profile && profile.username == user.username ?
                        <div className="right_bar">
                            <i className='icon_ll'><BiWorld /></i>
                            <i className='icon_ll'><BsThreeDots /></i>
                        </div> : null
                }
            </div>
            {/* From  */}
            <div className="work_item_about_ppp">
                {
                    loading ?
                        <>
                            <TextLoading w="50%" />
                        </> :
                        <div className="left_bar">
                            <i className='icon_ll'><MdLocationOn /></i>
                            <div className="heading_work_menu_tt">
                                <h6 className="title_of_work">
                                    {`    From ${profile.details && profile.details.homeTown.name && profile.details.homeTown.name}`}
                                </h6>
                            </div>
                        </div>
                }
                {

                    profile && profile.username == user.username ?
                        <div className="right_bar">
                            <i className='icon_ll'><BiWorld /></i>
                            <i className='icon_ll'><BsThreeDots /></i>
                        </div> : null
                }
            </div>
        </div>
    )
}

export default Overview
import React, { useState } from 'react'
import SidebarItems from '../../../Components/Home/Sidebar/Items';
import { left } from '../../../Helpers/sidebar'
import { BsChevronDown } from 'react-icons/bs';
import Scrollbars from 'rc-scrollbars';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Sidebars() {

    const navigate = useNavigate()
    const { user } = useSelector(x => x.auth)

    // Accordion Collapse
    const [collapse, setCollapse] = useState(5)
    const seeMore = () => {
        if (collapse === 5) {
            setCollapse(100)
        } else {
            setCollapse(5)
        }
    }
    const seeMoreShortcut = () => {
        console.log("Many Items");
    }

    return (
        <div className="home_side_bar_main ">
            <Scrollbars autoHide style={{ height: "90vh", width: "100%" }}>
                <div className={`menu_item_five ${collapse > 5 && "menu_item_all_full"}`}>
                    <div onClick={() => navigate(`/profile/${user.username}`)} className="mt-2 sidebar_items d-flex align-items-center">
                        <div className="images_icons user">
                            <img src={user && user.picture} alt="user" />
                        </div>
                        <div className="title_sidebar">
                            {user && user.first_name + " " + user.last_name}
                        </div>
                    </div>
                    {
                        left.slice(0, collapse).map((x, i) => (
                            <SidebarItems item={x} key={i} />
                        ))
                    }
                    <div onClick={() => seeMore()} className="sidebar_items d-flex align-items-center">
                        <div className="images_icons arrow_icon">
                            <BsChevronDown />
                        </div>
                        <div className="title_sidebar">
                            See More
                        </div>
                    </div>
                </div>
                <hr />





                {/* Bottom shortcut */}
                {/* ShortCut */}

                <div className="bottom_sidebar_shortcut">
                    <h5>Your Shortcuts</h5>
                    <div className="sidebar_items d-flex align-items-center">
                        <div className="images_icons user">
                            <img src="https://st4.depositphotos.com/13318524/31366/i/600/depositphotos_313664490-stock-photo-portrait-young-handsome-manly-man.jpg" alt="user" />
                        </div>
                        <div className="title_sidebar">
                            Kajol Roy
                        </div>
                    </div>
                    <div className="sidebar_items d-flex align-items-center">
                        <div className="images_icons user">
                            <img src="https://m.cricbuzz.com/a/img/v1/192x192/i1/c171058/wriddhiman-saha.jpg" alt="user" />
                        </div>
                        <div className="title_sidebar">
                            Fehdara Kani
                        </div>
                    </div>
                    <div className="sidebar_items d-flex align-items-center">
                        <div className="images_icons user">
                            <img src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="user" />
                        </div>
                        <div className="title_sidebar">
                            Jackline Maho
                        </div>
                    </div>
                    {/* See More */}
                    <div onClick={() => seeMoreShortcut()} className="sidebar_items d-flex align-items-center">
                        <div className="images_icons arrow_icon">
                            <BsChevronDown />
                        </div>
                        <div className="title_sidebar">
                            See More
                        </div>
                    </div>
                    {/* Bottom text */}
                    <p>
                        Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  ·   · Meta © 2022
                    </p>
                </div>
            </Scrollbars>
        </div>
    )
}

export default Sidebars
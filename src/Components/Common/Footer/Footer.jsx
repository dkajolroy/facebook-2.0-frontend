import React from 'react'
import { Link } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import './footer.css'

function Footer() {
    return (
        <div className='footer_area_ui'>
            <div className="top_label">
                <Link to="/">English (UK)</Link>
                <Link to="/">বাংলা</Link>
                <Link to="/">অসমীয়া</Link>
                <Link to="/">हिन्दी
                </Link>
                <Link to="/">नेपाली
                </Link>
                <Link to="/">Bahasa Indonesia
                </Link>
                <Link to="/">العربية
                </Link>
                <Link to="/">中文(简体)
                </Link>
                <Link to="/">Bahasa Melayu
                </Link>
                <Link to="/">Español
                </Link>
                <Link to="/">Português (Brasil)
                </Link>
                <Link to="/"><BsPlusLg /></Link>
            </div>
            <hr />
            <div className="bottom_label">

                <Link to="/">Sign Up</Link>
                <Link to="/">Log In</Link>
                <Link to="/">Messenger</Link>
                <Link to="/">Facebook Lite</Link>
                <Link to="/">Watch</Link>
                <Link to="/">Places</Link>
                <Link to="/"> Games</Link>
                <Link to="/"> Marketplace</Link>
                <Link to="/">Facebook Pay</Link>
                <Link to="/">Oculus</Link>
                <Link to="/">Portal</Link>
                <Link to="/">Instagram</Link>
                <Link to="/"> Bulletin</Link>
                <Link to="/">Local</Link>
                <Link to="/">Fundraisers</Link>
                <Link to="/">Services</Link>
                <Link to="/">Voting Information Centre</Link>
                <Link to="/">Groups</Link>
                <Link to="/">About</Link>
                <Link to="/">Create ad</Link>
                <Link to="/">Create Page</Link>
                <Link to="/">Developers</Link>
                <Link to="/">  Careers</Link>
                <Link to="/"> Privacy</Link>
                <Link to="/"> Cookies</Link>
                <Link to="/">AdChoices</Link>
                <Link to="/"> Help</Link>
                <Link to="/">Contact</Link>
                <Link to="/">Uploading & Non-UsersSettings</Link>
            </div>
            <p>Meta © {new Date().getFullYear()}</p>
        </div>
    )
}

export default Footer
import React from 'react'
import Footer from '../../Components/Common/Footer/Footer'
import Login from '../../Components/SignIn/Login'
import './sign_in.css'

function SignIn() {
    return (
        <div className="sign_ui__screen">
            <div className='container'>
                <div className="col-lg-10 m-auto">
                    <div className="row login_main_ui">
                        <div className="col-lg-7 col-md-6">
                            <div className="left_witter_">
                                <h2>facebook</h2>
                                <p>
                                    Facebook helps you connect and share with the people in your life.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 ">
                            <Login />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_login_area">
                <div className="container">
                    <div className="col-lg-10 py-4 m-auto">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
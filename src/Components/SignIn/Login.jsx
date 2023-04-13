import React, { useEffect, useState } from 'react'
import './style.css'
import { Toaster } from 'react-hot-toast';
import { Field, Formik, Form } from 'formik';
import { BiHide, BiShow } from 'react-icons/bi';
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import SignUp from './SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { signInReducerAction } from '../../Redux/Actions/SignInActions';

const initial = { email: "", password: '' }
const validSchema = yup.object({
    email: yup.string().required("Please type email or username").trim(),
    password: yup.string().required("Please type your password")
})

function Login() {
    // Toggle Password Show & Hide
    const [show, setShow] = useState(false)

    // Redux state management
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = useSelector(x => x.auth)


    // Protected Route
    useEffect(() => {
        if (state.user.first_name) {
            navigate('/')
        }
    }, [state.user])


    // Submit Login Form
    const submitFrom = (e) => {
        const loginInfo = { emailPhoneUsername: e.email, password: e.password }
        dispatch(signInReducerAction(loginInfo));
    }

    // Open Close Modal
    const [modal, setModal] = useState(false)
    return (
        <div className='login__form__ui'>
            <Toaster />
            <Formik
                initialValues={initial}
                validationSchema={validSchema}
                onSubmit={(e) => submitFrom(e)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="email_input_g">
                            <Field className={` form-control`} name="email" placeholder="Username or Email address" />
                            <div className="error_message"></div>
                        </div>
                        <div className="email_input_g">
                            <Field className={` form-control`} type={show ? "text" : "password"} name="password" placeholder="Password" />
                            <span onClick={() => setShow(!show)} className='eay_pass'>{show ? <BiShow /> : <BiHide />}</span>
                            <div className="error_message"></div>
                        </div>
                        <div className="action_group">
                            <button className="btn shadow-none" type='submit'>
                                {
                                    state.loading ?
                                        <>
                                            <div className="spinner-grow spinner-grow-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <div className="spinner-grow spinner-grow-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <div className="spinner-grow spinner-grow-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </> :
                                        "Log In"
                                }
                            </button>
                            <Link to="/">Forgotten password?</Link>
                            <hr />
                            <button onClick={() => setModal(true)} className="btn shadow-none">Create Account</button>
                        </div>
                    </Form>
                )}
            </Formik>
            {
                modal ?
                    <Modal
                        isOpen={modal}
                        contentLabel="SignUp Modal"
                        ariaHideApp={false}
                        className="col-lg-4 col-md-6 col-sm-7 mx-3 animate__animated animate__fadeIn"
                        onRequestClose={() => setModal(false)}
                        style={{
                            overlay: {
                                position: 'absolute',
                                bottom: "0",
                                left: "0",
                                display: "flex",
                                justifyContent: "center",
                                right: '0',
                                zIndex: "1000",
                                background: "rgb(255 255 255 / 80%)"
                            },
                            content: {
                                top: '0',
                                border: "none",
                                padding: '0'
                            }
                        }}
                    >
                        <div className="sign_up_ui_form">
                            <SignUp modal={modal} setModal={setModal} />
                        </div>
                    </Modal> : null
            }
        </div >
    )
}

export default Login
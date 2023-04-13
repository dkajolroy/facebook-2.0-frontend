import { Field, Form, Formik } from 'formik'
import React from 'react'
import { GrClose } from 'react-icons/gr'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { registerAction } from '../../Redux/Actions/SignInActions'

const initial = {
    gender: "",
    password: '',
    surname: '',
    mobileOrEmail: "",
    bDay: '',
    bMonth: '',
    bYear: '',
    first_name: ''
}
const validSchema = yup.object({
    first_name: yup.string().required("Name is empty").min(3, "Invalid name"),
    surname: yup.string(),
    mobileOrEmail: yup.string().required("Email or phone required").min(3, "Enter valid information"),
    password: yup.string().required("Please type your password").min(4, "Minimum 4 character required"),
    bDay: yup.string().required("Birth date is required"),
    bMonth: yup.string().required("Birth month is required"),
    bYear: yup.string().required("Birth year is required"),
    gender: yup.string().required("Select your gender")
})

function SignUp({ setModal, modal }) {

    // Redux Method
    const dispatch = useDispatch()
    const state = useSelector(x => x.auth)


    // Submit Login Form
    const submitFrom = (e) => {
        dispatch(registerAction(e))
    }


    // Date of birth
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    const dayOfMonth = new Date(currentYear, currentMonth, 0).getDate()
    const allDayOfMonth = [...Array(dayOfMonth).keys()]
    const allMonth = [...Array(12).keys()]
    const hundredYear = [...Array(currentYear).keys()].slice(currentYear - 100, currentYear).sort((a, b) => {
        return b - a
    })


    return (
        <div className="sign_up__form ">
            <div className="form_top d-flex justify-content-between">
                <div className="sign_up_text">
                    <h2>Sign Up</h2>
                    <p>It's quick and easy.</p>
                </div>
                <span onClick={() => setModal(!modal)} className="close_icon">
                    <GrClose />
                </span>
            </div>
            <div className="divider"></div>

            {/* SignUp Form */}
            <div className="sign_ui_input_groupe">
                <Formik
                    initialValues={initial}
                    validationSchema={validSchema}
                    onSubmit={(e) => submitFrom(e)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="row gx-2 ">
                                <div className="col-md-6 sign_up_input_group">
                                    <div className={errors.first_name && touched.first_name ? "error_group_res" : null}></div>
                                    <Field className={`shadow-none form-control ${errors.first_name && touched.first_name ? "is-invalid" : null}`} name="first_name" placeholder="First Name" />

                                    {
                                        errors.first_name && touched.first_name ?
                                            <div className="error_message_input first_name">
                                                <span> {errors.first_name}</span>
                                                <div className="error_arrow"></div>
                                            </div>
                                            : null
                                    }
                                </div>
                                <div className="col-md-6 sign_up_input_group">
                                    <Field className={`shadow-none form-control ${errors.first_name && touched.first_name ? "is-invalid" : null}`} name="surname" placeholder="Surname" />
                                </div>
                            </div>
                            <div className=" sign_up_input_group">
                                <div className={errors.mobileOrEmail && touched.mobileOrEmail ? "error_group_res" : null}></div>
                                <Field className={`shadow-none form-control ${errors.mobileOrEmail && touched.mobileOrEmail ? "is-invalid" : null}`} type="text" name="mobileOrEmail" placeholder="Mobile number or email address" />
                                {
                                    errors.mobileOrEmail && touched.mobileOrEmail ?
                                        <div className="error_message_input">
                                            <span> {errors.mobileOrEmail}</span>
                                            <div className="error_arrow"></div>
                                        </div>
                                        : null
                                }
                            </div>
                            <div className=" sign_up_input_group">
                                <div className={errors.password && touched.password ? "error_group_res" : null}></div>
                                <Field className={`shadow-none form-control ${errors.password && touched.password ? "is-invalid" : null}`} type="password" name="password" placeholder="Password" />
                                {
                                    errors.password && touched.password ?
                                        <div className="error_message_input">
                                            <span> {errors.password}</span>
                                            <div className="error_arrow"></div>
                                        </div>
                                        : null
                                }
                            </div>

                            {/* Date Of Birth */}
                            <div className={`sign_up_input_group ${errors.bDay && touched.bDay ? "border border-danger rounded" : errors.bMonth && touched.bMonth ? "border border-danger rounded" : errors.bYear && touched.bYear ? "border border-danger rounded" : null}`}>
                                <div className={errors.bDay && touched.bDay ? "error_group_res" : null}></div>
                                <span>Date Of Birth ?</span>
                                <div className={`row gx-2 `}>
                                    <div className="col-4 ">
                                        <div className="date_of_birth_group">
                                            <Field as="select" name="bDay" className={`shadow-none form-select `} >
                                                <option value=''>Day</option>
                                                {
                                                    allDayOfMonth.map((x, i) => (
                                                        <option key={i} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-4 ">
                                        <div className="date_of_birth_group">
                                            <Field as="select" name="bMonth" className={`shadow-none form-select`} >
                                                <option value=''>Month</option>
                                                {
                                                    allMonth.map((x, i) => (
                                                        <option key={i} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-4 ">
                                        <div className="date_of_birth_group">
                                            <Field as="select" name="bYear" className={`shadow-none form-select`} >
                                                <option value=''>Year</option>
                                                {
                                                    hundredYear.map((x, i) => (
                                                        <option key={i} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                {
                                    errors.bDay && touched.bDay ?
                                        <div className="error_message_input">
                                            <span> {errors.bDay}</span>
                                            <div className="error_arrow"></div>
                                        </div>
                                        : errors.bMonth && touched.bMonth ?
                                            <div className="error_message_input">
                                                <span> {errors.bMonth}</span>
                                                <div className="error_arrow"></div>
                                            </div>
                                            : errors.bYear && touched.bYear ?
                                                <div className="error_message_input">
                                                    <span> {errors.bYear}</span>
                                                    <div className="error_arrow"></div>
                                                </div>
                                                : null
                                }
                            </div>

                            {/* Gender */}
                            <div className={`sign_up_input_group ${errors.gender && touched.gender ? "border border-danger rounded" : null}`}>
                                <div className={errors.gender && touched.gender ? "error_group_res" : null}></div>
                                <span>Gender?</span>
                                <div className="row gx-2 w-100">
                                    <div className="col-4">
                                        <div className="gender_input_groupe">
                                            <label htmlFor="female">Female</label>
                                            <Field type="radio" name="gender" value="female" id="female" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="gender_input_groupe">
                                            <label htmlFor="male">Male</label>
                                            <Field type="radio" name="gender" value="male" id="male" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="gender_input_groupe">
                                            <label htmlFor="other">Other</label>
                                            <Field type="radio" name="gender" value="other" id="other" />
                                        </div>
                                    </div>
                                </div>
                                {
                                    errors.gender && touched.gender ?
                                        <div className="error_message_input">
                                            <span> {errors.gender}</span>
                                            <div className="error_arrow"></div>
                                        </div>
                                        : null
                                }
                            </div>

                            <div className="action_group">
                                <span>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</span>

                                <button type='submit' className="btn shadow-none">
                                    {state.loading ?
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
                                        "Sign Up"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUp
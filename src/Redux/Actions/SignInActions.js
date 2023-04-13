import axios from 'axios'
import toast from 'react-hot-toast';
import { API_URI } from '../../config';


//Register Only action
export const registerAction = (user) => async (dispatch) => {
    try {
        dispatch({ type: "USER_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(`${API_URI}/register`, user, config)
        dispatch({ type: "USER_SUC", payload: data })
        localStorage.setItem("fb_2pQ0r", JSON.stringify(data))
        toast.success("Registration successfully !", {
            duration: 2000
        })
    } catch (error) {
        toast.error(error.response && error.message ?
            error.response.data.message : error.message, {
            duration: 2000
        })
        dispatch({
            type: "USER_FAIL",
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })

    }
}

// Login only Action
export const signInReducerAction = (user) => async (dispatch) => {
    try {
        dispatch({ type: "USER_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(`${API_URI}/login`, user, config)
        dispatch({ type: "USER_SUC", payload: data })
        localStorage.setItem("fb_2pQ0r", JSON.stringify(data))

    } catch (error) {
        toast.error(error.response && error.message ?
            error.response.data.message : error.message, {
            duration: 2000
        })
        dispatch({
            type: "USER_FAIL",
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })

    }
}
// Logout
export const logOutAction = () => async (dispatch) => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("fb_2pQ0r")
    toast.success("Logout Successfully !!", {
        duration: 2000
    })
}

// Theme Setup
export const themeAction = (info) => (dispatch, state) => {

    dispatch({
        type: "THEME",
        payload: info
    })
    localStorage.setItem("fb_theme_sv", JSON.stringify(info))
}
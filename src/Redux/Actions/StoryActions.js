import axios from 'axios'
import toast from 'react-hot-toast'
import { API_URI } from '../../config'


export const getStoryAction = () => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        dispatch({ type: "GET_STORY_REQ" })
        const config = {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${API_URI}/story`, config)
        dispatch({ type: "GET_STORY_SUC", payload: data })
    } catch (error) {
        dispatch({
            type: "GET_STORY_ERR",
            payload: error.response && error.message ? error.response.data.message : error.message
        })

    }
}

export const createStoryAction = (image) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/story`, image, config)
        const { data } = await axios.get(`${API_URI}/story`, config)
        dispatch({ type: "GET_STORY_SUC", payload: data })
    } catch (error) {
        toast.error(
            error.response && error.message ? error.response.data.message : error.message
            , {
                duration: 2000,
                position: 'top-center',
                iconTheme: {
                    primary: '#d50000',
                    secondary: '#fff ',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
                style: {
                    boxShadow: "0px 3px 4px #858585"
                }
            });
    }
}


export const deleteStoryAction = (storyId) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.delete(`${API_URI}/story`, storyId, config)
        const { data } = await axios.get(`${API_URI}/story`, config)
        dispatch({ type: "GET_STORY_SUC", payload: data })
    } catch (error) {
        toast.error(
            error.response && error.message ? error.response.data.message : error.message
            , {
                duration: 2000,
                position: 'top-center',
                iconTheme: {
                    primary: '#d50000',
                    secondary: '#fff ',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
                style: {
                    boxShadow: "0px 3px 4px #858585"
                }
            });
    }
}
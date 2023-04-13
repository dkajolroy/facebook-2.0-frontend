import axios from "axios"
import toast from "react-hot-toast"
import { API_URI } from "../../config"

export const getMyPostAction = (username) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        dispatch({ type: "G_MY_POST_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.post(`${API_URI}/my_post`, { username }, config)
        dispatch({ type: "G_MY_POST_SUC", payload: data })

    } catch (error) {
        dispatch({
            type: "G_MY_POST_ERR",
            payload: error.response && error.message ? error.response.data.message : error.message
        })

    }
}
// Get Followings Post
export const getFollowingPostActions = () => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        dispatch({ type: "GET_FNG_POST_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${API_URI}/follower_post`, config)
        dispatch({ type: "GET_FNG_POST_SUC", payload: data })
    } catch (error) {
        dispatch({
            type: "GET_FNG_POST_ERR",
            payload: error.response && error.message ? error.response.data.message : error.message
        })

    }
}


// View Photo Store
export const viewPhotoAction = (images) => async (dispatch) => {
    dispatch({ type: "VIEW_PHOTO", payload: images })
}



// Post Comments
export const commentsToPost = (commentData) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/comment`, commentData, config)
        const { data } = await axios.get(`${API_URI}/follower_post`, config)
        dispatch({ type: "GET_FNG_POST_SUC", payload: data })
        const fff = await axios.post(`${API_URI}/my_post`, { username: user.username }, config)
        dispatch({ type: "G_MY_POST_SUC", payload: fff.data })
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

// Delete Post
export const deletePostActon = (postId) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.delete(`${API_URI}/delete/${postId}`, config)
        const { data } = await axios.get(`${API_URI}/follower_post`, config)
        dispatch({ type: "GET_FNG_POST_SUC", payload: data })
        const fff = await axios.post(`${API_URI}/my_post`, { username: user.username }, config)
        dispatch({ type: "G_MY_POST_SUC", payload: fff.data })
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
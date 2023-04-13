import axios, { AxiosError } from 'axios'
import { API_URI } from '../../config'
import toast from 'react-hot-toast'

// Profile User Details
export const getDetailsAction = (username) => async (dispatch, state) => {
    const { auth: { user } } = state()

    try {
        dispatch({ type: "GET_USER_REQ" })
        const config = {
            headers: {
                "Content-Type": 'application/json',
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.post(`${API_URI}/user`, { username: username || user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })

    } catch (error) {
        dispatch({
            type: "GET_USER_ERR",
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })
    }

}


// Requested all Friends
export const allFriendsAction = () => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        dispatch({ type: "GET_FRIEND_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${API_URI}/all_friend`, config)
        dispatch({ type: "GET_FRIEND_SUC", payload: data })
    } catch (error) {
        dispatch({
            type: "GET_FRIEND_ERR",
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })

    }
}


// GET All My Requested Friends
export const requested_friendAction = () => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        dispatch({ type: "RE_FRIENDS_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${API_URI}/request`, config)
        dispatch({ type: "RE_FRIENDS_SUC", payload: data })
    } catch (error) {
        dispatch({
            type: "RE_FRIENDS_ERR",
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })

    }
}

// Friend Request
export const friend_request = (username) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/add_friend/${username}`, {}, config)
        const { data } = await axios.get(`${API_URI}/all_user`, config)
        dispatch({
            type: "GET_ALL_USER_SUC",
            payload: data
        })
    } catch (error) {
        toast.error(error.response && error.message ? error.response.data.message : error.message, {
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

// Unfriend Request
export const unfriend = (userID) => async (dispatch, state) => {
    try {
        const { auth: { user } } = state()
        dispatch({ type: "UNFRIEND_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/unfriend/${userID}`, {}, config)
        const { data } = await axios.get(`${API_URI}/all_friend`, config)
        dispatch({ type: "GET_FRIEND_SUC", payload: data })
    } catch (error) {
        toast.error(error.response && error.message ? error.response.data.message : error.message, {
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


// Get All user
export const getAllUserAction = () => async (dispatch, state) => {
    const { auth: { user } } = state();
    try {
        dispatch({ type: "GET_ALL_USER_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${API_URI}/all_user`, config)
        dispatch({
            type: "GET_ALL_USER_SUC",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "GET_ALL_USER_ERR",
            payload: error.response && error.message ?
                error.response.data.message : error.message
        })
    }
}

// Accept Request 
export const acceptRequestAction = (username) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/accept_request/${username}`, {}, config)
        const { data } = await axios.get(`${API_URI}/request`, config)
        dispatch({ type: "RE_FRIENDS_SUC", payload: data })
    } catch (error) {
        toast.error(error.response && error.message ? error.response.data.message : error.message, {
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


// add Profile Picture
export const addProfilePicture = ({ image, text }) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {

        const config = {
            headers: {
                "Content-Type": 'application/json',
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/avatar`, { image, text }, config)
        const { data } = await axios.get(`${API_URI}/refresh`, config)
        const res = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: res.data })
        const ddd = await axios.post(`${API_URI}/get_photo`, { max: 15, folder: '' }, config)
        dispatch({ type: "GET_ALL_PHOTOS_SUC", payload: ddd.data })
        const all = await axios.post(`${API_URI}/my_post`, { username: user.username }, config)
        dispatch({ type: "G_MY_POST_SUC", payload: all.data })
        dispatch({ type: "USER_SUC", payload: data })
        localStorage.setItem("fb_2pQ0r", JSON.stringify(data))
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

// Edit bio
export const editBioActions = (info) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/edit_bio`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// Cover Picture
export const editCoverAction = (info) => async (dispatch, state) => {
    const { auth: { user } } = state()

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/cover`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
        const ddd = await axios.post(`${API_URI}/get_photo`, { max: 15, folder: '' }, config)
        dispatch({ type: "GET_ALL_PHOTOS_SUC", payload: ddd.data })
        const all = await axios.post(`${API_URI}/my_post`, { username: user.username }, config)
        dispatch({ type: "G_MY_POST_SUC", payload: all.data })
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

// Remove Cover Image
export const removeCoverAction = () => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/remove_cover`, {}, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// GEt User All Photos
export const getAllPhotos = (info) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        dispatch({ type: "GET_ALL_PHOTOS_REQ" })
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.post(`${API_URI}/get_photo`, info, config)
        dispatch({ type: "GET_ALL_PHOTOS_SUC", payload: data })
    } catch (error) {
        dispatch({
            type: "GET_ALL_PHOTOS_ERR",
            payload: error.response && error.message ? error.response.data.message : error.message
        })
    }
}

// add Searched Users
export const addSearchedUserAction = (userID) => async (dispatch, state) => {
    console.log(userID)
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/search_add`, userID, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// Delete searched users
export const removeSearchedUserAction = (info) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/search_remove`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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

// GEt ALl Friends Id
export const getAllFIdAction = () => async (dispatch, state) => {
    const { auth: { user } } = state()
    dispatch({ type: "GET_USER_ID_REQ" })
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${API_URI}/my_friends`, config)
        dispatch({ type: "GET_USER_ID_SUC", payload: data })
    } catch (error) {
        dispatch({
            type: "GET_USER_ID_ERR",
            payload: error.response && error.message ? error.response.data.message : error.message
        })
    }
}

// Add Hobbies
export const hobbiesAction = (info) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/hobbies`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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

// User Social Link Add
export const socialLinkAddAction = (info) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/social`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// User Social Link Add
export const addFeatureAction = (images) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/feature`, { images }, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
        const ddd = await axios.post(`${API_URI}/get_photo`, { max: 15, folder: '' }, config)
        dispatch({ type: "GET_ALL_PHOTOS_SUC", payload: ddd.data })
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

// live_in current city 
export const liveInCurrentCity = (info) => async (dispatch, state) => {

    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/live_in`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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

// live_in current city 
export const CurrentCity = (info) => async (dispatch, state) => {

    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/from_now`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// live_in current city 
export const relationship = (info) => async (dispatch, state) => {

    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/relationship`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// Phone NUmber Change
export const phonNumberAction = (info) => async (dispatch, state) => {

    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/phone`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// Phone NUmber Change
export const emailAddressAction = (info) => async (dispatch, state) => {

    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/email`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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



// Phone NUmber Change
export const websiteAddAction = (info) => async (dispatch, state) => {

    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/website`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// Phone NUmber Change
export const workAddAction = (info) => async (dispatch, state) => {

    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.post(`${API_URI}/work`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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


// Phone NUmber Change
export const removeWorkAction = (info) => async (dispatch, state) => {

    const { auth: { user } } = state()

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/work`, info, config)
        const { data } = await axios.post(`${API_URI}/user`, { username: user.username }, config)
        dispatch({ type: "GET_USER_SUC", payload: data })
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
import axios from "axios"
import toast from "react-hot-toast"
import { API_URI } from "../../config"

export const react = (info) => async (dispatch, state) => {
    const { auth: { user } } = state()
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`
            }
        }
        await axios.put(`${API_URI}/react`, info, config)
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

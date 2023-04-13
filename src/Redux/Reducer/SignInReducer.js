
// Register
export const userAuthReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case "USER_REQ":
            return { loading: true, user: {}, error: 0 }
        case "USER_SUC":
            return { loading: false, user: action.payload, error: 0 }
        case "USER_FAIL":
            return { loading: false, user: {}, error: action.payload }
        case "LOGOUT":
            return { loading: false, user: {}, error: 0 }
        default: return state
    }
}

// Theme Setup
export const themeReducer = (state = { value: 'light' }, action) => {
    switch (action.type) {
        case "THEME":
            return { value: action.payload }
        default: return state
    }
}
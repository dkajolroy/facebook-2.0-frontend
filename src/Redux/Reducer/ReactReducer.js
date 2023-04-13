
export const getPostReact = (state = { react: [] }, action) => {
    switch (action.type) {
        case "GET_REACT_REQ":
            return { loading: true, react: [], error: 0 };
        case "GET_REACT_SUC":
            return { loading: false, react: action.payload, error: 0 }
        case "GET_REACT_ERR":
            return { loading: false, react: [], error: action.payload };
        default: return state;
    }
}
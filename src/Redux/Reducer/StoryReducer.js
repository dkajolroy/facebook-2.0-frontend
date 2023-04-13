


export const getStoryReducer = (state = { story: [] }, action) => {
    switch (action.type) {
        case "GET_STORY_REQ":
            return { loading: true, story: [], error: 0 }
        case "GET_STORY_SUC":
            return { loading: false, story: action.payload, error: 0 };
        case "GET_STORY_ERR":
            return { loading: false, story: [], error: action.payload };
        default: return state;
    }
}
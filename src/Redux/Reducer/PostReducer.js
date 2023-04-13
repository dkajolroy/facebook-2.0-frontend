

export const getMyPostReducer = (state = { post: [] }, action) => {
    switch (action.type) {
        case "G_MY_POST_REQ":
            return { loading: true, post: [], error: 0 }
        case "G_MY_POST_SUC":
            return { loading: false, post: action.payload, error: 0 }
        case "G_MY_POST_ERR":
            return { loading: false, post: [], error: action.payload }
        default: return state
    }
}

// getFollowingPostActions
export const getFollowingPostReducer = (state = { posts: [], loading: false, error: 0 }, action) => {
    switch (action.type) {
        case "GET_FNG_POST_REQ":
            return { loading: true, posts: [], error: 0 };
        case "GET_FNG_POST_SUC":
            return { loading: false, posts: action.payload, error: 0 }
        case "GET_FNG_POST_ERR":
            return { loading: false, posts: [], error: action.payload }
        default: return state;
    }
}

// View Photo Store
export const viewPhotoReducer = (state = { images: [] }, action) => {
    switch (action.type) {
        case "VIEW_PHOTO":
            return { images: action.payload }
        default: return state
    }
}

// Visit Profile Post
export const visitProfilePostReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case "VISIT_POST_REQ":
            return { loading: true, posts: [], error: 0 };
        case "VISIT_POST_SUC":
            return { loading: false, posts: action.payload, error: 0 }
        case "VISIT_POST_ERR":
            return { loading: false, posts: [], error: action.payload }
        default: return state;
    }
}
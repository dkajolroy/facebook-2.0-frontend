
//Profile User Data 
export const getDetailsReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case "GET_USER_REQ":
            return { loading: true, profile: {}, error: 0 };
        case "GET_USER_SUC":
            return { loading: false, profile: action.payload, error: 0 };
        case "GET_USER_ERR":
            return { loading: false, profile: {}, error: 0 };
        default: return state
    }
}


// Requested Friends list
export const allFriendsReducer = (state = { friendList: [] }, action) => {
    switch (action.type) {
        case "GET_FRIEND_REQ":
            return { loding: true, friendList: [], error: 0 };
        case "GET_FRIEND_SUC":
            return { loding: false, friendList: action.payload, error: 0 };
        case "GET_FRIEND_ERR":
            return { loading: false, friendList: [], error: action.payload };
        default: return state;
    }
}


// Requested Friends list
export const requested_friendReducer = (state = { request: [] }, action) => {
    switch (action.type) {
        case "RE_FRIENDS_REQ":
            return { loading: true, request: [], error: 0 };
        case "RE_FRIENDS_SUC":
            return { loading: false, request: action.payload, error: 0 };
        case "RE_FRIENDS_ERR":
            return { loading: false, request: [], error: action.payload };
        default: return state;
    }
}

// Get all user
export const getAllUserReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_USER_REQ":
            return { loading: true, error: 0, user: [] };
        case "GET_ALL_USER_SUC":
            return { loading: false, error: 0, user: action.payload };
        case "GET_ALL_USER_ERR":
            return { loading: false, error: action.payload, user: [] };
        default: return state
    }
}


// User all Photos get
export const getAllPhotosReducer = (state = { photos: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_PHOTOS_REQ":
            return { loading: true, photos: [], error: 0 }
        case "GET_ALL_PHOTOS_SUC":
            return { loading: false, photos: action.payload, error: 0 }
        case "GET_ALL_PHOTOS_ERR":
            return { loading: false, photos: [], error: action.payload }
        default: return state
    }
}



// User GEt Reducer
export const getAllFIdReducer = (state = { userFriends: [] }, action) => {
    switch (action.type) {
        case "GET_USER_ID_REQ":
            return { loading: true, userFriends: [], error: 0 };
        case "GET_USER_ID_SUC":
            return { loading: true, userFriends: action.payload, error: 0 }
        case "GET_USER_ID_ERR":
            return { loading: true, userFriends: [], error: action.payload }
        default: return state;
    }
}
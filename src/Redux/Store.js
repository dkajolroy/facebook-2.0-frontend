import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import { themeReducer, userAuthReducer } from './Reducer/SignInReducer';
import {
    getDetailsReducer,
    allFriendsReducer,
    requested_friendReducer,
    getAllUserReducer,
    getAllPhotosReducer,
    getAllFIdReducer
} from './Reducer/UserReducer';
import { getFollowingPostReducer, getMyPostReducer, viewPhotoReducer } from './Reducer/PostReducer';
import { getPostReact } from './Reducer/ReactReducer';
import { getStoryReducer } from './Reducer/StoryReducer';


// Config Reducer
const Reducer = combineReducers({
    auth: userAuthReducer,
    user: getDetailsReducer,
    allFriends: allFriendsReducer,
    requestedFriend: requested_friendReducer,
    allUser: getAllUserReducer,
    myPost: getMyPostReducer,
    allPosts: getFollowingPostReducer,
    theme: themeReducer,
    allPhotos: getAllPhotosReducer,
    postReact: getPostReact,
    getStory: getStoryReducer,
    viewPhotos: viewPhotoReducer,
    getFriendsID: getAllFIdReducer
});

// Local Storage
const mediaUser = localStorage.getItem("fb_2pQ0r") && JSON.parse(localStorage.getItem("fb_2pQ0r"))
const themeSet = localStorage.getItem("fb_theme_sv") && JSON.parse(localStorage.getItem('fb_theme_sv'))
// Default Values
const InitialValue = {
    auth: { user: mediaUser || {} },
    theme: { value: themeSet || "light" }
};



const store = legacy_createStore(Reducer, InitialValue, composeWithDevTools(applyMiddleware(thunk)))
export default store
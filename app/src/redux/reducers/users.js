import { 
    SET_USERNAME, 
    SET_CREATOR_TYPE, 
    SET_WEBSITE_URL, 
    SET_RELATIONSHIP_TYPE,
    SET_YOUTUBE_URL,
    SET_INSTAGRAM_URL,
    GET_ALL_POST_DATA
 } from "../actions/user";


 const initialState = {
     username: "",
     creatorType: "",
     websiteURL: "",
     relationshipType: "",
     youtubeURL: "",
     instagramURL: "",
     postData: [],
 }

 function userReducer(state = initialState, action) {
     switch (action.type) {
         case SET_USERNAME:
             return { ...state, username: action.payload};
         case SET_CREATOR_TYPE:
             return { ...state, creatorType: action.payload};
         case SET_WEBSITE_URL:
             return { ...state, websiteURL: action.payload};
         case SET_RELATIONSHIP_TYPE:
             return { ...state, relationshipType: action.payload};
         case SET_YOUTUBE_URL:
             return { ...state, youtubeURL: action.payload};
         case SET_INSTAGRAM_URL:
             return { ...state, instagramURL: action.payload};
         case GET_ALL_POST_DATA:
             return { ...state, postData: action.payload};
         default: 
             return state;
     }
 }

 export default userReducer;
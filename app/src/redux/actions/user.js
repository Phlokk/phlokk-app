export const SET_USERNAME = 'SET_USERNAME';
export const SET_CREATOR_TYPE = 'SET_CREATOR_TYPE';
export const SET_WEBSITE_URL = 'SET_WEBSITE_URL';
export const SET_RELATIONSHIP_TYPE = 'SET_RELATIONSHIP_TYPE';
export const SET_YOUTUBE_URL = 'SET_YOUTUBE_URL';
export const SET_INSTAGRAM_URL = 'SET_INSTAGRAM_URL';
export const GET_ALL_POST_DATA = 'GET_ALL_POST_DATA';

export const setUsername = username => dispatch => {
    dispatch({
        type: SET_USERNAME,
        payload: username,
    })
}

export const setCreatorType = creatorType => dispatch => {
    dispatch({
        type: SET_CREATOR_TYPE,
        payload: creatorType,
    })
}

export const setWebsiteURL = websiteURL => dispatch => {
    dispatch({
        type: SET_WEBSITE_URL,
        payload: websiteURL,
    })
}

export const setRelationshipType = relationshipType => dispatch => {
    dispatch({
        type: SET_RELATIONSHIP_TYPE,
        payload: relationshipType,
    })
}

export const setYoutubeURL = youtubeURL => dispatch => {
    dispatch({
        type: SET_YOUTUBE_URL,
        payload: youtubeURL,
    })
}
export const setInstagramURL = instagramURL => dispatch => {
    dispatch({
        type: SET_INSTAGRAM_URL,
        payload: instagramURL,
    })
}




export const getAllPostData = () => {
    try {
        return async dispatch => {
            const result = await fetch(POST_API_URL,{
                method: 'GET',
                headers: {
                    Accept: application/json, 
                    Authorization: Bearer , 
                    ContentType: application/json
                }
            });
            const json = await result.json();
            if(json) {
                dispatch({
                    type: GET_ALL_POST_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch post!');
            }
        }
    } catch (error) {
        console.log(error)
    }
}





export const GET_ALL_POST_DATA = 'GET_ALL_POST_DATA';


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





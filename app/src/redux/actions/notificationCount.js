
import { types } from "../constants";

export const setNotificationCount = (count) => (dispatch) => { 
      dispatch({
        type: types.SET_NOTIFICATION_COUNT,  
        count: count
      }); 
};

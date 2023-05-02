import { types } from "../constants";

const initialState = {
  count: null, 
};

export const notificationCount = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATION_COUNT:
      return {
        ...state,
        count: action.count, 
      };
    default:
      return state;
  }
};

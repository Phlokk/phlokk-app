import { types } from "../constants";


const initialState = {
  currentUser: null,
  loaded: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
        loaded: action.loaded,
      };
    default:
      return state;
  }
};


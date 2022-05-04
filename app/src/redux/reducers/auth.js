import { USER_STATE_CHANGE } from "../constants";
import { USER_PROFILE_IMAGE_CHANGE } from "../constants";

const initialState = {
  currentUser: null,
  loaded: false,
};

const initialStateImage = {
  currentUserProfileImage: null,
  loaded: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
        loaded: action.loaded,
      };
    default:
      return state;
  }
};

export const profileImageUpdate = (state = initialStateImage, action) => {
  switch (action.type) {
    case USER_PROFILE_IMAGE_CHANGE:
      return {
        ...state,
        currentUserProfileImage: action.currentUserProfileImage,
        loaded: action.loaded,
      };
    default:
      return state;
  }
};

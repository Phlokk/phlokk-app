import { types } from "../constants";

const initialState = {
  postsLikes: [],
};

export const likes = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_POSTS_LIKES:
      return {
        ...state,
        postsLikes: action.postsLikes,
      };
    case types.UPDATE_POST_LIKES:
      const index = state.postsLikes.findIndex(
        (post) => post.postId === action.post.postId
      );
      const newArray = [...state.postsLikes];
      newArray[index].likes = action.post.likes;
      newArray[index].liked = action.post.liked;

      return {
        ...state,
        postsLikes: newArray,
      };
    default:
      return state;
  }
};

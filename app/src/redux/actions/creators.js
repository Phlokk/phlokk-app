import { types } from "../constants";

export function fetchMarketCreatorData(data) {
  return {
    type: types.SEND_REQUEST_GET_MARKET_CREATOR,
    payload: data,
  };
}

export function fetchMarketCreatorSuccess(creator) {
  return {
    type: types.SEND_REQUEST_GET_MARKET_CREATOR_SUCCESS,
    payload: creator,
  };
}

export function fetchMarketCreatorFailure(error) {
  return {
    type: types.SEND_REQUEST_GET_MARKET_CREATOR_FAILURE,
    payload: {},
    error: error,
  };
}

export function setPostsLikes(postsLikes) {
  return {
    type: types.SET_POSTS_LIKES,
    payload: { postsLikes },
    error: error,
  };
}

export function updatePostLike(post) {
  return {
    type: types.SET_POSTS_LIKES,
    payload: { post },
    error: error,
  };
}

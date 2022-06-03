import { types } from "../constants";

const initialState = {
  loading: false,
  creator: [],
  error: {},
};

export default userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SEND_REQUEST_GET_MARKET_CREATOR:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_GET_MARKET_CREATOR_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case types.SEND_REQUEST_GET_MARKET_CREATOR_FAILURE:
      return {
        ...state,
        creator: [],
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
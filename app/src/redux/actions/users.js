import { types } from "../constants";

export function fetchUserData(data) {
  return {
    type: types.SEND_REQUEST_GET_USER,
    payload: data,
  };
}

export function fetchDataSuccess(user) {
  return {
    type: types.SEND_REQUEST_GET_USER_SUCCESS,
    payload: user,
  };
}

export function fetchDataFailure(error) {
  return {
    type: types.SEND_REQUEST_GET_USER_FAILURE,
    payload: {},
    error: error,
  };
}

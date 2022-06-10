import { call, put, takeEvery } from "redux-saga/effects";
import { types } from "../constants";
import { getAllUsers } from "../apis/contactApi";

function* getUsers(data) {
  try {
    const user = yield call(getAllUsers(data));
    yield put({ type: types.SEND_REQUEST_GET_USER_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: types.SEND_REQUEST_GET_USER_FAILURE, payload: error });
    console.log(error);
  }
}

export default function* userSaga() {
  yield takeEvery(types.SEND_REQUEST_GET_USER, getUsers);
}

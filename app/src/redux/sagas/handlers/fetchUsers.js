import { call, put, takeLatest } from "redux-saga/effects";
import fetchGetUsers from "../requests/fetchUsers";

function* handleGetUsers() {
  try {
    const user = yield call(fetchGetUsers);
    yield put({ type: "GET_USERS_SUCCESS", user: user });
  } catch (err) {
    yield put({ type: "GET_USERS_FAILED", message: err.message });
  }
}

function* watcherUserSaga() {
  yield takeLatest("GET_USERS_REQUESTED", handleGetUsers);
}

export default watcherUserSaga;

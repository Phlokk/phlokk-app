import { spawn } from "redux-saga/effects";

// Sagas
import userSaga from "../sagas/userSaga";

// Export the root saga
export default function* rootSaga() {
  yield spawn(userSaga);
}

import { spawn } from "redux-saga/effects";

// Sagas
// import userSaga from "./userSaga";
import creatorSaga from "./creatorSaga";

// Export the root saga
export default function* rootSaga() {
  // yield spawn(userSaga);
  yield spawn(creatorSaga);
}

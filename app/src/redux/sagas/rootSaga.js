import { spawn } from "redux-saga/effects";

// Sagas
import creatorSaga from "./creatorSaga";

// Export the root saga
export default function* rootSaga() {
  yield spawn(creatorSaga);
}

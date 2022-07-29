import { call, put, takeEvery } from "redux-saga/effects";
import { types } from "../constants";
import { getAllMarketCreators } from "../apis/contactApi";

function* getMarketCreators() {
  try {
    const creator = yield call(getAllMarketCreators);
    yield put({ type: types.SEND_REQUEST_GET_MARKET_CREATOR_SUCCESS, payload: creator });
  } catch (error) {
    yield put({ type: types.SEND_REQUEST_GET_MARKET_CREATOR_FAILURE, payload: error });
  }
}

export default function* creatorSaga() {
  yield takeEvery(types.SEND_REQUEST_GET_MARKET_CREATOR, getMarketCreators);
}

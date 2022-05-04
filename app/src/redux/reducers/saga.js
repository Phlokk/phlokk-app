import {takeEvery, takeLatest } from 'redux-saga/effects'
// import Api '...';


export function* watcherSaga (action) {

    try {
        const user = yield call(Api, watcherSaga, action.payload.data);
        yield put({type: "USER_REQUEST_SUCCESSFUL", user: user})
    } catch (err) {
        yield put({type: "USER_REQUEST_UNSUCCESSFUL", message: err.message});
    }

}

function* getUserInfo() {
    yield takeEvery("USER_REQUEST_SUCCESSFUL", watcherSaga );
}
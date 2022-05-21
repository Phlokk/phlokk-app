// import { call, put, takeEvery } from "redux-saga/effects";
// import { fetchDataSuccess, fetchDataFailure } from '../../reduxTK/reducers/userState'
// import { getAllUsers } from "../../redux/apis/contactApi";

// function* getUserSaga() {
//   try {
//     const user = yield call(getAllUsers);
//     yield put(fetchDataSuccess(user));
//   } catch (error) {
//     yield put(fetchDataFailure(error));
//     console.log(error);
//   }
// }

// function* userSaga() {
//   yield takeEvery('user/fetchUserData', getUserSaga);
// }

// export default userSaga;